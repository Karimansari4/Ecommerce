const User = require('../Models/Users')
const Product = require('../Models/Product')
const path = require('path')

exports.getProduct = async (req, res) => {
    let { page } = req.query

    page = page ? page : 1

    const productPerPage = 12

    let startIndex = productPerPage * page - productPerPage
    let endIndex = productPerPage * page

    try {
        const result = await Product.find().sort({createAt: -1})
        const filterResult = result.slice(startIndex, endIndex)

        res.status(200).json({result, filterResult})
    } catch (error) {
        res.status(403).json({msg: 'Unable to get Products'})
    }
}

exports.createProduct = async (req, res) => {
    try {
        
        const proImage = req.files.proImage
        const userId = req.params.id
        const itemName = req.body.itemName
        const quantity = req.body.quantity
        const price = req.body.price
        const totalAmount = req.body.totalAmount
        const size = req.body.size
        const sell_Price = req.body.sell_price
        // console.log("sell price: ", sell_Price);
        // console.log('id: ', userId);
        if(userId){
            // console.log('id: ', userId);
            const userData = await User.findOne({_id: userId})
            // console.log("user: ", userData);
            // console.log('role: ', userData.role);
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
                }else if(!sell_Price > price){
                    return res.status(400).json({msg: 'Please Enter Sell Price more than Purche Price'})
                }else if(sell_Price.length == 0){
                    return res.status(400).json({msg: 'Please Enter Sell Price'})
                }else{
                    const fileName = `${itemName}${path.extname(proImage.name)}`
                    proImage.mv(`client/public/Products/${fileName}`, (err) => {
                        if(err){
                            console.log("err: ", err);
                        }
                    })
                    const products = new Product({itemName, quantity, price, totalAmount, size, sell_Price, proImages: fileName, userId})
                    // console.log("data: ", products);
                    const result = await products.save()
                    // console.log('submited: ', result);
                    if(result){
                        // console.log('this is if condition submit');
                        return res.status(200).json({msg: 'Product Created Successfully'})
                    }else{
                        return res.status(400).json({msg: 'Product Failed to Create'})
                    }
                    // return res.status(404).json({msg: 'Something went wrong'})
                }
            }else if(userData.role === 'user'){
                return res.status(403).json({msg: 'Access Denied!'})
            }else{
                return res.status(403).json({msg: 'Access is Denied!'})
            }
            // res.status(200).json({msg: 'This is products from serverS'}) category add to cart sub admin
        }else{
            return res.status(404).json({msg: 'Please Login to Admin Account'})
        }
        // res.send('this is product')
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({msg: error})
    }
}