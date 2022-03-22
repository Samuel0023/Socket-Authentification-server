const { Schema, model } = require('mongoose');
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El name es obligatorio']
    },
    mail: {
        type: String,
        required: [true, 'el mail es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'la password es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);