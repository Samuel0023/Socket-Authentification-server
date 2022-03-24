const bcryptjs = require('bcryptjs');
class Login {
    user;

    constructor(mail, password) {
        this.mail = mail;
        this.password = password;
    }

    setUser(user) {
        this.user = user;
    }

    validateUser(res) {
        //console.log({ "mail": `${this.mail}` });
        if (!this.user) {
            return res.status(400).json({
                msg: 'user not found'
            });
        }
        if (!this.validateState()) {
            return res.status(400).json({
                msg: 'user not active'
            });
        }
        if (!this.validatePassword()) {
            return res.status(400).json({
                msg: 'incorrect password'
            });

        }
        return res.json({
            msg: 'Login OK :)'
        });
    }
    validateState() {
        return this.user.state
    }
    validatePassword() {
        return bcryptjs.compareSync(this.password, this.user.password);
    }
}

module.exports = Login;