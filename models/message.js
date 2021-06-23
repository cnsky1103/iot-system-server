const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    alert: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

module.exports = Message