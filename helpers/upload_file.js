const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadDocument = async(files, suportedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameSplited = file.name.split('.');
        const extension = nameSplited[nameSplited.length - 1];


        //valid extensions

        if (!suportedExtensions.includes(extension)) {
            return reject(`This extension ${extension} is not allowed - ${suportedExtensions}`);
        }

        const nameTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads', folder, nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) { reject(err) }
            resolve(nameTemp);
        });
    })
}

module.exports = { uploadDocument }