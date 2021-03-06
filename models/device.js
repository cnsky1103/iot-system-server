const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceSchema = new Schema({
    clientId: {
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
    }
}, { timestamps: true })

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device