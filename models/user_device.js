const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_deviceSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User_Device = mongoose.model('User_Device', user_deviceSchema)

module.exports = User_Device