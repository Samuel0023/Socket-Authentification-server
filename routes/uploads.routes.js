const { Router } = require('express');
const { check } = require('express-validator');
const UploadController = require('../controllers/upload.controller');

const router = new Router();

router.post('/', UploadController.uploadDoc);


module.exports = router;