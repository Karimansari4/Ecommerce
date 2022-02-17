const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'subAdmin'],
        default: 'user'
    },
    contact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'defalut.png'
    }
}, {timestamps: true})

const users = mongoose.model('users', UsersSchema)
module.exports = users