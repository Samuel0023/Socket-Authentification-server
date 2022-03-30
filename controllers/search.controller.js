const e = require("express");
const { User, Product, Category } = require("../models");
const { ObjectId } = require('mongoose').Types;

const SEARCH_METHOD_DEFAULT = (toSearch = '', res) => {
    res.status(500).json({
        msg: 'forgot to implement that search'
    })
}
const searchUsers = async(toSearch = '', res = Response) => {
    const isMongoID = ObjectId.isValid(toSearch);
    try {
        if (isMongoID) {
            const user = await User.findById({ _id: toSearch });
            return res.status(500).json({
                results: (user) ? [user] : []
            });
        }
        const regex = new RegExp(toSearch, 'i');
        const users = await User.find({
            $or: [{ name: regex }, { mail: regex }],
            $and: [{ state: true }]
        });
        res.status(500).json({
            results: users
        });
    } catch (error) {
        res.status(400).json({
            msg: "user not found in DB"
        });
    }

}
const searchProduct = async(toSearch = "", res) => {
    const isMongoID = ObjectId.isValid(toSearch);
    try {
        if (isMongoID) {
            const product = await Product.findById({ _id: toSearch }).populate('category', 'name');
            return res.status(500).json({
                results: (product) ? [product] : []
            });
        }
        const regex = new RegExp(toSearch, 'i');
        const products = await Product.find({ name: regex, state: true })
            .populate('category', 'name');
        res.status(500).json({
            results: products
        });
    } catch (error) {
        res.status(400).json({
            msg: "product not found in DB"
        });
    }
}
const searchCategory = async(toSearch = "", res) => {
    const isMongoID = ObjectId.isValid(toSearch);
    try {
        if (isMongoID) {

            const categories = await Category.findById({ _id: toSearch });
            return res.status(500).json({
                results: (categories) ? [categories] : []
            });
        }
        const regex = new RegExp(toSearch, 'i');
        const categories = await Category.find({
            $or: [{ name: regex }],
            $and: [{ state: true }]
        });
        res.status(500).json({
            results: categories
        });
    } catch (error) {
        res.status(400).json({
            msg: "category not found in DB"
        });
    }
}

const avialableCollections = {

    'categories': searchCategory,
    'product': searchProduct,
    'users': searchUsers,
    'roles': SEARCH_METHOD_DEFAULT
}

const search = async(req, res) => {

    const { collection, toSearch } = req.params;


    if (!avialableCollections[collection]) {
        return res.status(400).json({
            msg: "No avialable name's collection"
        });
    }
    avialableCollections[collection](toSearch, res);

};

module.exports = { search };