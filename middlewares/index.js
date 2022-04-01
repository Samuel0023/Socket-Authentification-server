const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { hasARole } = require('../middlewares/validate-role');
const { validateFileToUpload } = require('../middlewares/validate-file');


module.exports = {
    validateFields,
    validateJWT,
    hasARole,
    validateFileToUpload
}