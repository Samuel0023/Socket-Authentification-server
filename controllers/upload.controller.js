const { response } = require("express");
const { uploadDocument } = require("../helpers/upload_file");


const UploadController = {
    uploadDoc: async(req, res = response) => {

        if (!req.files || Object.keys(req.files).length == 0 || !req.files.file) {
            res.status(400).json({
                msg: 'No files were uploaded.'
            });
            return;
        }

        //imagenes
        try {
            const name = await uploadDocument(req.files);
            console.log(name);
            res.json({ name });
        } catch (error) {
            res.json({ error })
        }
    }

}

module.exports = UploadController;