const { Router } = require('express');
const { check } = require('express-validator');

const UserController = require('../controllers/user.controller');
const { isValiteRole, isValiteMail, idExists } = require('../helpers/db.validators');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, hasARole } = require('../middlewares/validate-role');

const router = new Router();

router.get('/', UserController.usersGet);

router.post('/', [
    check('name', 'invalid name').not().isEmpty(),
    check('password', 'invalid password at least 6 caracters').isLength({ min: 6 }),
    check('mail', 'invalid mail').isEmail(),
    check('mail').custom(isValiteMail),
    //check('role').custom(role =>isValiteRole(role)),
    check('role').custom(isValiteRole),
    validateFields
], UserController.usersPost);

router.put('/:id', [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(idExists),
    check('role').custom(isValiteRole),
    validateFields
], UserController.usersPut);

router.patch('/', UserController.usersPatch);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasARole("ADMIN_ROLE", "VENTO_ROLE"),
    check('id', 'invalid id').isMongoId(),
    check('id').custom(idExists),
    validateFields
], UserController.usersDelete);

module.exports = router;