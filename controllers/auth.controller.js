const Login = require("../helpers/login");

const User = require('../models/user');

const login = async(req, res) => {

    const { mail, password } = req.body;

    try {
        const user = await User.findOne({ mail });
        const login = new Login(mail, password);
        login.setUser(user);
        //verificar si el correo existe

        return login.validateUser(res);
        //Generar el JWT -json web token

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Fatal error, talk to admin'
        });
    }

};

const googleSignIn = async(req, res) => {
    const { id_token } = req.body;


    res.json({
        msg: 'Everthings ok :)',
        id_token
    })
}

module.exports = { login, googleSignIn };