const mqtt = require('mqtt')
const client = mqtt.connect('tcp://localhost:1883')
const Message = require('../models/message')
const Device = require('../models/device')

client.on('connect', function () {
    client.subscribe('testapp', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
})

client.on('message', async (topic, message) => {
    // message is Buffer
    console.log(message.toString())
    const messageJSON = JSON.parse(message.toString())
    const m = Message({
        clientId: messageJSON.clientId,
        info: messageJSON.info,
        lat: messageJSON.lat,
        lng: messageJSON.lng
    })

    await m.save()

    await Device.updateOne({ "clientId": messageJSON.clientId }, {
        clientId: messageJSON.clientId,
        lat: messageJSON.lat,
        lng: messageJSON.lng
    }, { upsert: true, setDefaultsOnInsert: true })
})

module.exports = client