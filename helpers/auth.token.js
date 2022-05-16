const jwt = require('jsonwebtoken');
const { User } = require('../models')

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        let payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("can't generate a new token");
            } else {
                resolve(token);
            }
        });
    });
}

const checkJWT = async(token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        return (user.state) ? user : null;
    } catch (error) {
        return null;
    }
}
module.exports = { generateJWT, checkJWT };