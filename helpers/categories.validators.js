const { Category } = require("../models")

const existCategory = async(_id = '') => {
    let isCategoryExist = await Category.findById({ _id });
    if (!isCategoryExist) {
        throw new Error(`This category doesn't exists`);
    }
    if (!isCategoryExist.state) {
        throw new Error(`This category was removed`);
    }
}

module.exports = { existCategory }