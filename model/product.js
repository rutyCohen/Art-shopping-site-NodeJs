const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
    categryId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "category"
    },
    name:{
        type: String, 
        minlength: 2,
        maxlength: 20,
    },
    price:{
        type: Number, 
    },
    desc:{
        type: String, 
        minlength: 2,
        maxlength:100,
    },
    Images:{
        type: String,
    }
    });
    module.exports=mongoose.model('product', productSchema);