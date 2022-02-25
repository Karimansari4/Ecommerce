const express = require('express')
const { createProduct, getProduct, deleteProduct } = require('../Controllers/Products')
const proRouter = express.Router()

proRouter.get('/getProduct', getProduct)
proRouter.post('/craete/:id', createProduct)
proRouter.delete('/delete/:id', deleteProduct)



module.exports = proRouter