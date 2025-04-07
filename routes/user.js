const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).json("Data SuccessFully Posted!")

    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/verify-login', async (req, res) => {
    try {
        const user = await User.findOne({
            mobile: req.body.mobile
        })
        console.log("First", user)
        if (user) {
            if (user.password == req.body.password) {
                console.log(user)
                res.status(200).json(user)
            } else {
                console.log("seond", user)
                return res.status(401).json({
                    message: "Invalid Password"
                })
            }
        } else {
            console.log("last", user)
            return res.status(404).json({
                message: "User Not Registered"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router