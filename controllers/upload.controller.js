const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
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
    },

    getFile: async(req, res) => {


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

        if (modelo.img) {
            const pathImg = path.join(__dirname, '../uploads/', collection, modelo.img);

            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg);
            }
        }

        const pathPlaceHolder = path.join(__dirname, '../public/assets', 'no-image.jpg');
        res.sendFile(pathPlaceHolder);
    },
    updateImgCloudinary: async(req, res = response) => {

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
            const nameArr = modelo.img.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split(',');
            cloudinary.uploader.destroy(public_id);

        }
        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();
        res.json(modelo);
    },
    getFileCloudinary: async(req, res) => {


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
        if (modelo.img) {

            return res.redirect(modelo.img)

        }
        const pathPlaceHolder = path.join(__dirname, '../public/assets', 'no-image.jpg');
        res.sendFile(pathPlaceHolder);
    }
}

module.exports = UploadController;