const express = require('express')
const { createProduct } = require('../Controllers/Products')
const proRouter = express.Router()

proRouter.post('/craete/:id', createProduct)



module.exports = proRouter