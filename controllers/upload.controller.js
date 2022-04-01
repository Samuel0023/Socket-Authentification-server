const { response } = require("express");
const { uploadDocument } = require("../helpers/upload_file");
const { User, Product } = require("../models");


const UploadController = {
    uploadDoc: async(req, res = response) => {

        if (!req.files || Object.keys(req.files).length == 0 || !req.files.file) {
            res.status(400).json({
                msg: 'No files were uploaded.'
            });
            return;
        }

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

        let modelo;
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


        res.json({ collection });

    }
}

module.exports = UploadController;