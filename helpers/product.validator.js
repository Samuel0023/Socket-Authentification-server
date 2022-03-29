const { Product } = require("../models")

const isValidateProduct = async(_id = '') => {
    let existProduct = await Product.findById({ _id });
    if (!existProduct) {
        throw new Error(`This product doesn't exists`);
    }
    if (!existProduct.state) {
        throw new Error(`This product was removed`);
    }
}

module.exports = { isValidateProduct }