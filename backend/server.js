require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//db connection
const dbUrl = 'mongodb://localhost:27017/expanses';
try{
    mongoose.connect(process.env.DBURL || dbUrl, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    console.log('Database connected successfully');
} catch(err) {
    console.log({message: 'Connection Failed...', err: err});
}

//server starting
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}/`);
})