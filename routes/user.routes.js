const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersDelete, usersPost, usersPut, usersPatch } = require('../controllers/user.controller');
const { validateFields } = require('../middlewares/validate-fields');
const router = new Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'invalid name').not().isEmpty(),
    check('password', 'invalid password at least 6 caracters').isLength({ min: 6 }),
    check('mail', 'invalid mail').isEmail(),
    check('rol', 'invalid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usersPost);

router.put('/:id', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;