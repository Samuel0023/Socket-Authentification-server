const { Router } = require('express');
const { usersGet, usersDelete, usersPost, usersPut, usersPatch } = require('../controllers/user.controller');
const router = new Router();

router.get('/', usersGet);
router.post('/', usersPost);
router.put('/', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;