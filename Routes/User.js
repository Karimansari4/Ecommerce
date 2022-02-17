const express = require('express')
const userRouter = express.Router()
const controller = require('../Controllers/Users')

userRouter.get('/', controller.getUser)

userRouter.post('/singup', controller.signup)

userRouter.post('/singin', controller.signin)


module.exports = userRouter