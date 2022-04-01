const path = require('path');
const fs = require('fs');

const { response } = require("express");

const { uploadDocument } = require("../helpers/upload_file");
const { User, Product } = require("../models");


const UploadController = {
    uploadDoc: async(req, res = response) => {
        try {
            const name = await uploadDocument(req.files);
            console.log(name);
            res.json({ name });
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    updateImg: async(req, res = response) => {

        const { id, collection } = req.params;

        var modelo;
        switch (collection) {
            case 'users':
                modelo = await User.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `This user with id: ${id} no exist`
                    });
                }
                break;
            case 'product':
                modelo = await Product.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `This product with id: ${id} no exist`
                    });
                }
                break;
            default:
                return res.status(500).json({ msg: `forget to valid this` });
        }
        //clean prev img's

        if (modelo.img) {
            // delete img on server
            const pathImg = path.join(__dirname, '../uploads/', collection, modelo.img);

            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg);
            }
        }

        const name = await uploadDocument(req.files, undefined, collection);
        modelo.img = await name;
        await modelo.save();
        res.json(modelo);
    }
}

module.exports = UploadController;