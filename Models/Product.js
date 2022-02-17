const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    size: [Number],
    sell_Price: {
        type: Number,
        required: true
    },
    proImages: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
    
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product