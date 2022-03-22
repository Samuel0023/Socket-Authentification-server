const bcrytjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const usersGet = (req, res) => {
    res.json({
        msg: 'GET API - Controller'
    });
};

const usersPost = async(req, res) => {

    const { name, mail, password, role } = req.body;
    const usuario = new User({ name, mail, password, role });


    //Encriptar la contraseña
    var salt = bcrytjs.genSaltSync();
    usuario.password = bcrytjs.hashSync(password, salt);
    //guardar en la base de datos
    await usuario.save();



    res.json({
        msg: 'POST API - Controller',
        usuario
    });
};

const usersPut = async(req, res) => {
    const { id } = req.params;
    const { password, google, ...rest } = req.body;
    if (password) {
        const salt = bcrytjs.genSaltSync();
        rest.password = bcrytjs.hashSync(password, salt);
    }
    const usuario = await User.findByIdAndUpdate(id, rest);
    res.json({
        msg: 'PUT API - Controller',
        usuario
    });
};

const usersPatch = (req, res) => {
    res.json({
        msg: 'PATCH API - Controller'
    });
};

const usersDelete = (req, res) => {
    res.json({
        msg: 'DELETE API - Controller'
    });
};




module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };