const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');


const router = new Router();

router.post('/login', [
    check('mail', 'mail is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'id_token required').not().isEmpty(),
    validateFields
], googleSignIn);


module.exports = router;