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
    console.log({...req.body})
    res.json({
        status:"success"
    })
})

module.exports = Router