const { googleVerify } = require("../helpers/google.verify");
const Login = require("../helpers/login");

const { User } = require('../models');

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

    try {
        //const googleUser = await googleVerify(id_token);
        const { mail, name, img } = await googleVerify(id_token);

        let user = await User.findOne({ mail });

        if (!user) {
            const data = {
                name,
                mail,
                password: ':D',
                img,
                google: true
            }
            user = new User(data);

            await user.save();

        }

        if (!user.state) return res.status(401).json({ msg: 'talk with the admin, user blocked :( ' });

        res.json({
            msg: 'Everythings ok :) ',
            user,
            id_token

        });
    } catch (error) {
        res.status(500).json({
            msg: 'token  :('
        });
    }
}

module.exports = { login, googleSignIn };