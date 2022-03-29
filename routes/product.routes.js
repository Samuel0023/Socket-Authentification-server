const { Router } = require('express');
const { check } = require('express-validator');
const ProductController = require('../controllers/product.controller');
const CategoryController = require('../controllers/categories.controller');
const { existCategory } = require('../helpers/categories.validators');
const { validateJWT, validateFields, hasARole } = require('../middlewares');
const { isValidateProduct } = require('../helpers/product.validator');
const { isAdminRole } = require('../middlewares/validate-role');

const router = new Router();

//get all products - public
router.get('/', ProductController.getProducts);
//get an especific  - id
router.get('/:id', [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(isValidateProduct),
    validateFields
], ProductController.getProduct);

//create a new category - private - (token valid) "post"
router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty(),

    validateFields
], ProductController.createProduct);
//Actualizar - private - (token valid) "put"

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'invalid id').isMongoId(),
    check('id').custom(isValidateProduct),
    validateFields
], ProductController.updateProduct);

//Delete category - private - Admin

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'invalid id').isMongoId(),
    check('id').custom(isValidateProduct),
    validateFields
], ProductController.deleteProduct);
module.exports = router;