const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const userRouter = require('./Routes/User')
const proRouter = require('./Routes/Product')
const path = require('path');

app.use(cors())

mongoose.connect('mongodb+srv://Ecommerce-user:JobKarim@cluster0.q1qqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, con) => {
    if(err) throw err
    console.log('Database Connected');
})

app.use(fileUpload())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(__dirname + '/bulid/Products'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.use('/user', userRouter)
app.use('/product', proRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))