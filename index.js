const express = require('express');
const app = express(); 
const mongoose = require('mongoose'); 
const dotenv= require("dotenv");

//import Routes 
const authRoute =require('./routes/auth');
dotenv.config();  

//connexion  au db 
mongoose.connect(process.env.DB_CONNECT , {useNewUrlParser: true}, 
() => console.log('connected to db')); 

// Middleware 
app.use(express.json());

//Routes middlewares 
app.use('/api/user',authRoute);


app.listen(3000 ,()=>console.log('server up and running'));