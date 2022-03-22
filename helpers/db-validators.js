const Role = require('../models/role');

const isValiteRole = (async(role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`This role ${role} isn't defined in DB`);
    }
});

module.exports = { isValiteRole };