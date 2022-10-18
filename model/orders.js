const mongoose=require('mongoose');
const product = require('./product')

const ordersSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userModel"
    },
    date:{
        type: Date, 
    },
    sum:{
        type: Number, 
        default: 1
    },
products:[
    {
    productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"product"
            },
            quntity:{type:Number}
        }]
    });

    module.exports=mongoose.model('orders', ordersSchema);