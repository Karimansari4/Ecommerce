const User = require('../Models/Users')
const Product = require('../Models/Product')
const path = require('path')

exports.createProduct = async (req, res) => {
    try {
        // const proImage = req.files.proImage
        // const { itemName, quantity, price, totalAmount, size, sell_price } = req.body
        const proImage = req.files.proImage
        const userId = req.params.id
        const itemName = req.body.itemName
        const quantity = req.body.quantity
        const price = req.body.price
        const totalAmount = req.body.totalAmount
        const size = req.body.size
        const sell_price = req.body.sell_price
        
        if(userId){
            const userData = await User.findOne({__id: userId})
            console.log("user: ", userData);
            if(userData.role === 'admin'){
                if(itemName === ''){
                    return res.status(400).json({msg: 'Please Enter Item Name'})
                }else if(quantity === '0'){
                    return res.status(400).json({msg: 'Please Enter Quantity'})
                }else if(price === '0'){
                    return res.status(400).json({msg: 'Please Enter Price'})
                }else if(!totalAmount === quantity * price){
                    return res.status(400).json({msg: 'Please Check again Total Amount'})
                }else if(totalAmount === '0'){
                    return res.status(400).json({msg: 'Please Enter Total Amount'})
                }else if(size === '0'){
                    return res.status(400).json({msg: 'Please Enter Size'})
                }else if(!sell_price > price){
                    return res.status(400).json({msg: 'Please Enter Sell Price more than Purche Price'})
                }else if(sell_price.length == 0){
                    return res.status(400).json({msg: 'Please Enter Sell Price'})
                }else{
                    const fileName = `${itemName}${path.extname(proImage.name)}`
                    proImage.mv(`client/public/Products/${fileName}`, (err) => {
                        if(err){
                            console.log("err: ", err);
                        }
                    })
                    const products = new Product({itemName, quantity, price, totalAmount, size, sell_price, proImages: fileName, userId})
                    console.log("products: ", products);
                    res.status(200).json({msg: 'This is products'})
                }
            }else{
                return res.status(403).json({msg: 'Access Denied!'})
            }
            // res.status(200).json({msg: 'This is products from serverS'})
        }else{
            return res.status(404).json({msg: 'Please Login to Admin Account'})
        }
        // res.send('this is product')
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({msg: error})
    }
}