const User = require('../Models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

const saltRounds = 10
const SECRET = 'myStrongJwtskfjlksjfssdlkjfksdjfklsjflksjdlfkjvnsvjiwflnva;klsjfnnsva;jasldfjns;vwjefnmnvi'
//token function
const craeteToken = (result) => {
    return jwt.sign({result}, SECRET, {
        expiresIn: '30d'
    });
}

exports.getUser = async (req, res) => {
    try {
        const result = await User.find()
        res.status(200).json(result)
        console.log(path.join(__dirname));
    } catch (error) {
        res.status(500).json({msg: 'server error'})
    }
}

exports.signup = async(req, res) => {
    
    try {
        const { name, email, password, role, contact, address } = req.body
        const file = req.files.profilePicture
        const checkUser = await User.findOne({email: email})
        if(checkUser){
            return res.status(400).json({msg: 'Email is already taken'})
        }else if(name === ''){
            return res.status(400).json({msg: 'Please Enter Your Name'})
        }else if( email === ''){
            return res.status(400).json({msg: 'Please Enter Your Email'})
        }else if(!email){
            return res.status(400).json({msg: 'Please Enter a valid email'})
        }else if(password === ''){
            return res.status(400).json({msg: 'Please Enter Password'})
        }else if(contact === ''){
            return res.status(400).json({msg: 'Please Enter Your Contact'})
        }else if(address === ''){
            return res.status(400).json({msg: 'Please Enter Your Address'})
        }else{
            const fileName = `${name}${path.extname(file.name)}`
            file.mv(`client/public/Users/${fileName}`, (err) => {
                if(err){
                    console.log(err);
                }
            })
            const hashdPass = await bcrypt.hash(password, saltRounds)
            const users = new User({name, email, password: hashdPass, role, contact, address, profilePicture: fileName})
            const result = await users.save()
            if(result){
                const token = craeteToken(result)
                return res.status(200).json({msg: 'SignUp Successfully', token})
                // console.log('success');
                // console.log("token: ", token);
            }else{
                return res.status(400).json({msg: 'Please fill correct details'})
            }
            
        }
    } catch (error) {
        return res.status(500).json({msg: error})
        console.log(error);
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        if(email === ''){
            res.status(400).json({smg: 'Please enter email'})
        }else if(password === ''){
            res.status(400).json({smg: 'Please enter password'})
        }else{
            const result = await User.findOne({email})
            // console.log(result);
            if(result){
                const matchedPass = await bcrypt.compare(password, result.password)
                // console.log(matchedPass);
                if(matchedPass){
                    const token = craeteToken(result)
                    return res.status(200).json({msg: 'Login Successfully', token})
                }else{
                    res.status(400).json({msg: 'Please email or password are incorrect'})
                }
            }else{
                res.status(404).json({msg: 'Email not found'})
            }
        }
    } catch (error) {
        res.status(500).json({msg: error})
        console.log(error);
    }
}