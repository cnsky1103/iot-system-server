const express = require('express')
const Router = express.Router()
const User = require('../models/user')


/**
 * login
 * @param req.body.username
 * @param req.body.password
 * */
Router.post('/login', async (req, res) => {
    accounts = await User.find({ "username": req.body.username });
    if (accounts.length === 0) {
        res.json({
            code: 1,
            error: "该用户不存在！"
        })
    } else {
        accounts = accounts.filter(account => account.password === req.body.password)
        if (accounts.length === 0) {
            res.json({
                code: 1,
                error: "密码错误！"
            })
        } else {
            res.json({
                code: 0,
                data: accounts
            })
        }
    }
})

/** 
 * register
 * @param req.body.username
 * @param req.body.password
 * @param req.body.email
 * */
Router.post('/register', async (req, res) => {
    const user = User({
        ...req.body
    })

    usernames = await User.find({ "username": req.body.username })
    emails = await User.find({ "email": req.body.email })

    if (usernames.length === 0 && emails.length === 0) {
        user.save()
            .then((result) => {
                res.json({
                    code: 0,
                    data: result
                })
            })
            .catch(res.json({
                code: 1,
                error: "系统错误"
            }))
    } else {
        if (usernames.length !== 0) {
            res.json({
                code: 1,
                error: "该用户名已存在！"
            })
        } else {
            res.json({
                code: 1,
                error: "该邮箱已被注册！"
            })
        }
    }
})

/** 
 * reset password
 * @param req.body.username
 * @param req.body.oldPassword
 * @param req.body.newPassword
 * */
Router.post('/reset', async (req, res) => {
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