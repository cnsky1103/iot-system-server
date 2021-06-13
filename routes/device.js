const express = require('express')
const Router = express.Router()
const Device = require('../models/device')
const User = require('../models/user')
const User_Device = require('../models/user_device')

/**
 * 
 * 
 */
Router.get('/', async (req, res) => {
    const allDevice = await Device.find({})

    res.json({
        code: 0,
        data: allDevice
    })
})

/**
 * @param req.body.username
 * @param req.body.clientId
 * @param req.body.name
 */
Router.post('/bind', async (req, res) => {
    console.log(req.body)
    const user_device = User_Device({
        username: req.body.username,
        clientId: req.body.clientId,
        name: req.body.name
    })

    const device = Device.find({ "clientId": req.body.clientId })
    if (device.length === 0) {
        res.json({
            code: 1,
            error: "该设备不存在！"
        })
    }

    await User_Device.findOneAndUpdate({
        "username": req.body.username,
        "clientId": req.body.clientId,
    }, {
        username: req.body.username,
        clientId: req.body.clientId,
        name: req.body.name
    }, { upsert: true })
    
    res.json({
        code: 0
    })
})

/**
 * @param username
 */
Router.get('/:username', async (req, res) => {
    const users = await User.find({ "username": req.params.username })
    if (users.length === 0) {
        res.json({
            code: 1,
            error: "用户不存在！"
        })
    } else {
        const devices = await User_Device.find({ "username": req.params.username })
        res.json({
            code: 0,
            data: devices
        })
    }

})


module.exports = Router