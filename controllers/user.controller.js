const bcrytjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const usersGet = (req, res) => {
    res.json({
        msg: 'GET API - Controller'
    });
};

const usersPost = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { name, mail, password, rol } = req.body;
    const usuario = new User({ name, mail, password, rol });

    // Verificar si el correo existe
    var existeMail = await User.findOne({ mail });
    if (existeMail) {
        return res.status(400).json({
            msg: 'Ese correo esta registrado'
        });
    }

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

const usersPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'PUT API - Controller',
        id
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