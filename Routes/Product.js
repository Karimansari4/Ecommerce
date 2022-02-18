const express = require('express')
const { createProduct, getProduct } = require('../Controllers/Products')
const proRouter = express.Router()

proRouter.get('/getProduct', getProduct)
proRouter.post('/craete/:id', createProduct)



module.exports = proRouter