const express = require('express')
const Router = express.Router()
const User = require('../models/user')

Router.post('/', (req, res) => {
    console.log({ ...req.body })

    User.find({
        ...req.body
    }).then(result => {
        res.json(result)
    }).catch(console.log)
})

Router.post('/register', async (req, res) => {
    console.log({ ...req.body })

    const user = User({
        ...req.body
    })

    const result = await User.find({ "username": req.body.username })

    if (result.length > 0) {
        user.save()
            .then((result) => { res.json(result) })
            .catch(console.log)
    } else {
        res.send({})
    }
})

Router.post('/reset', async (req, res) => {
    console.log({ ...req.body })

    const result = await User.find({ "username": req.body.username, "password": req.body.oldPassword })

    console.log(result);
    if (result.length > 0) {
        User.updateOne({ "username": req.body.username }, { "password": req.body.newPassword })
            .then(r => { res.json(r) })
            .catch(console.log)
    } else {
        res.send({})
    }
})

module.exports = Router