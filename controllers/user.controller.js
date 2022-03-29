'use strict'
const bcrytjs = require('bcryptjs');

const { User } = require('../models');


const UserController = {

    usersGet: async(req, res) => {
        const { limit = 5, skip = 0 } = req.query;
        let query = { state: true };


        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
        ]);
        res.json({
            total,
            users
        });
    },

    usersPost: async(req, res) => {

        const { name, mail, password, role } = req.body;
        const user = new User({ name, mail, password, role });


        //Encriptar la contraseña
        var salt = bcrytjs.genSaltSync();
        user.password = bcrytjs.hashSync(password, salt);
        //guardar en la base de datos
        await user.save();



        res.json({
            msg: 'POST API - Controller',
            user
        });
    },

    usersPut: async(req, res) => {
        const { id } = req.params;
        const { _id, password, google, ...rest } = req.body;
        if (password) {
            const salt = bcrytjs.genSaltSync();
            rest.password = bcrytjs.hashSync(password, salt);
        }
        const user = await User.findByIdAndUpdate(id, rest);
        res.json({
            msg: 'PUT API - Controller',
            user
        });
    },

    usersPatch: (req, res) => {
        res.json({
            msg: 'PATCH API - Controller'
        });
    },

    usersDelete: async(req, res) => {
        const { id } = req.params;

        //borrar fisicamente
        //const user = await User.findByIdAndDelete(id);
        const user = await User.findByIdAndUpdate(id, { state: false });

        res.json({
            msg: 'DELETE API - Controller',
            user
        });
    }
}



module.exports = UserController;