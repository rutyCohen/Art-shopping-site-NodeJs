const express=require('express');
const logger=require('./Logger/configuration');
//const db = require('./DB/db');
const db = require('./DB/mongoose');
const app=express();
const user=require("./Router/userRoute") ;
const product=require("./Router/productRoute"); 
const category=require("./Router/categoryRoute"); 
const orders=require("./Router/ordersRoute"); 
const { required } = require('nodemon/lib/config');
const {PORT} = require ('./config');
const {ENVIRONMENT} = require ('./config');
const path = require ('path')

app.use(express.static('static'));
db.conect();
app.use(express.json());
app.use('/api/user',user);
app.use('/api/product',product);
app.use('/api/category',category);
app.use('/api/orders',orders);



app.use((err, req, res, next)=>{
    if (ENVIRONMENT=='development')
    logger.error(err.message)
    if(err.message=='user validation failed: email: Please enter a valid email')
    res.status(400).send(err.message);
    else
    res.status(500).send(err.message);
})

app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname,'./static/404.html'));

});

app.listen(PORT,()=>{
    if (ENVIRONMENT=='development')
    logger.info(`server is running on port ${PORT} `);
});