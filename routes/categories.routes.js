const { Router } = require('express');
const { check } = require('express-validator');
const CategoryController = require('../controllers/categories.controller');
const { existCategory } = require('../helpers/categories.validators');
const { validateJWT, validateFields, hasARole } = require('../middlewares');

const router = new Router();

//get all categories
router.get('/', CategoryController.getCategories);
//get an especific  - id

router.get('/:id', [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(existCategory),
    validateFields
], CategoryController.getCategory);
//create a new category - private - (token valid) "post"
router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields
], CategoryController.makeCategory);

//Actualizar - private - (token valid) "put"

router.put('/:id', [
    validateJWT,
    check('id', 'invalid id').isMongoId(),
    check('id').custom(existCategory),
    validateFields
], CategoryController.updateCategory);

//Delete category - private - Admin

router.delete('/:id', [
    validateJWT,
    hasARole("ADMIN_ROLE"),
    check('id', 'invalid id').isMongoId(),
    check('id').custom(existCategory),
    validateFields
], CategoryController.deleteCategory);
module.exports = router;