const { Category, User } = require("../models");

const CategoryController = {
    makeCategory: async(req, res) => {
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({ name });

        if (categoryDB) {
            return res.status(400).json({
                msg: `This category ${categoryDB.name} already exists`
            });
        }
        // generate data
        const data = {
            name,
            user: req.uid
        }
        const category = new Category(data);

        //save DB
        try {
            await category.save();
            res.status(201).json(category);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "failed to save category"
            });
        }
    },
    getCategories: async(req, res) => {
        const { limit = 5, skip = 0 } = req.query;
        let query = { state: true };

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
            .populate('user', 'name')
            .skip(parseInt(skip))
            .limit(parseInt(limit))
        ]);

        res.json({
            total,
            categories
        })
    },
    getCategory: async(req, res) => {
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
    updateCategory: async(req, res) => {
        const { id } = req.params;
        const { _id, state, user, ...rest } = req.body;

        const category = await Category.findByIdAndUpdate(id, rest, { new: true });
        res.json({
            msg: "Update succesfull",
            category
        })
    },
    deleteCategory: async(req, res) => {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, { state: false })

        res.json({
            msg: `${category.name} was removed`
        });
    }
}

module.exports = CategoryController;