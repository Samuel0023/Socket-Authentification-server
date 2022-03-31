const { response } = require("express");

const UploadController = {
    uploadDoc: (req, res = response) => {
        res.json({
            msg: "upload doc..."
        })
    }

}

module.exports = UploadController;