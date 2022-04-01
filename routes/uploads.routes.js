const { Router } = require('express');
const { check } = require('express-validator');
const UploadController = require('../controllers/upload.controller');
const { allowedCollections } = require('../helpers/db.validators');
const { validateFields, validateFileToUpload } = require('../middlewares');

const router = new Router();

router.post('/', validateFileToUpload, UploadController.uploadDoc);

router.put('/:collection/:id', [
    validateFileToUpload,
    check('id', 'invalid id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'product'])),
    validateFields
], UploadController.updateImgCloudinary);

router.get('/:collection/:id', [

    check('id', 'invalid id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'product'])),
    validateFields
], UploadController.getFileCloudinary);
module.exports = router;