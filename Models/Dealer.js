const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DealerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

const Dealer = mongoose.model('dealer', DealerSchema)
module.exports = Dealer