const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersDelete, usersPost, usersPut, usersPatch } = require('../controllers/user.controller');
const router = new Router();

router.get('/', usersGet);
router.post('/', [
    check('mail', 'invalid mail').isEmail()
], usersPost);
router.put('/:id', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;