const express = require('express')
const Router = express.Router()
const User = require('../models/user')

Router.get('/', (req, res) => {
    console.log(req.baseUrl)
    res.json({
        username: 'user',
        password: '1919'
    })
})

Router.post('/', (req, res) => {
    console.log({ ...req.body })

    User.find({
        ...req.body
    }).then(result => {
        res.json(result)
    }).catch(console.log)
})

Router.post('/register', (req, res) => {
    console.log({ ...req.body })

    const user = User({
        ...req.body
    })

    user.save()
        .then((result) => { res.json(result) })
        .catch(console.log)
})

module.exports = Router