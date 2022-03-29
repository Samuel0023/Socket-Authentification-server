const { Product, Category } = require("../models");

const ProductController = {
    createProduct: async(req, res) => {
        var { name, category, ...body } = req.body;
        name = name.toUpperCase();

        const categoryDB = await getCategoryOfDB(category);
        if (!categoryDB) {
            return res.status(400).json({
                msg: `This category ${category} doesn't exist`
            });
        }
        const productDB = await Product.findOne({ name, categoryDB });

        if (productDB) {
            return res.status(400).json({
                msg: `This product ${productDB.name} on category:${category} already exists`
            });
        }
        // generate data
        const data = {
            name,
            user: req.uid,
            category: categoryDB,
            body
        }
        var product = new Product(data);
        //save DB
        try {
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "failed to save this product"
            });
        }
    },
    getProducts: async(req, res) => {
        const { limit = 5, skip = 0 } = req.query;
        let query = { state: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
            .populate('category', 'name')
            .populate('user', 'name')
            .skip(parseInt(skip))
            .limit(parseInt(limit))
        ]);

        res.json({
            total,
            products
        })
    },
    getProduct: async(req, res) => {
        const { id } = req.params;


        try {
            const category = await Category.findOne({ id }).populate('user', 'name');
            res.json({
                category
            });
        } catch (error) {
            res.status(400).json({
                msg: "category_id not found"
            });
        }
    },
    updateProduct: async(req, res) => {
        const { id } = req.params;
        const { _id, state, user, category, ...rest } = req.body;

        const product = await Product.findByIdAndUpdate(id, rest, { new: true });
        res.json({
            msg: "Update succesfull",
            product
        })
    },
    deleteProduct: async(req, res) => {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { state: false })

        res.json({
            msg: `${product.name} was removed`
        });
    }
}

let getCategoryOfDB = async(name_category) => {

    let name = name_category.toUpperCase();
    return await Category.findOne({ name });
};
module.exports = ProductController;