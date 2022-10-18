
const mongoose=require('mongoose');
const {isEmail} = require('validator');

const addressSchema = new mongoose.Schema({
    country: String,
    city: String,
    street:String,
    apartmentNumber: Number,
});

const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        unique: true,
        validate: [isEmail,`Please enter a valid email`]
    },
    password:{
        type: String, 
        minlength: 4,
        required: true,

    },
    firstName:{
        type: String, 
        minlength: 2,
        required: true
    },
    lastName:{
        type: String, 
        minlength: 2,
        required: true
    },    
    address:{
        type: [addressSchema],
        required: false,
    },
    lastVisit:{
        type: Date,
        default: new Date()
    }
    });

    userSchema.virtual('allOrdersByUserId',{
        ref:'orders',
        localField:'_id',
        foreignField:'userId'
        },{virtuals:true}) 
        
        userSchema.set('toJSON',{virtuals:true})

    module.exports=mongoose.model('user', userSchema);