const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: async function (value) {
                const user = await this.constructor.findOne({email: value});
                return !user;
            },
            message: 'Email already exists'
        },
    },
    password: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('User', userSchema)