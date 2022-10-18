const db = require('../DB/mongoose');
const { ObjectId } = require('mongodb');

const userModel = require('../model/userModel');
const mongoose = require('mongoose');

module.exports.getAll = async function getAll(req, res, next) {
    try {
        const uesrs = await userModel.find();
        await res.send(uesrs);
    }
    catch(error){
        next(error);
    }

};

module.exports.getById = async function getById(req, res, next) {
    try {
        
        const id = req.params.id;
        const userId = await userModel.findOne(ObjectId(id));
        if (userId)
        await res.send(userId);
        else
        await res.status(204).send(userId);

    }
    catch(error){
        next(error);

    }
};
module.exports.getByEmailAndPassword = async function getByEmailAndPassword(req, res, next) {
    try {
        const email = req.params.email;
        const password = req.params.password;
        const userId = await userModel.findOne({email,password});
        if (userId)
        await res.send(userId);
        else
        await res.status(204).send(userId);
   
    }
    catch(error){
        next(error);

    }
};


module.exports.postUser = async function postUser(req, res, next) {
    try {
        console.log(req.body,"req.body");
        const addUser = new userModel(req.body);
        const newUser = await addUser.save();
        await res.send(newUser);
    }
    catch(error){
        next(error);

    }
};

module.exports.deleteUsre = async function deleteUsre(req, res, next) {
    try {
        const id = req.params.id;
        const toDelete = await userModel.deleteOne({ _id: ObjectId(id) });
        await res.send(toDelete);
    }
    catch(error){
        next(error);
    }
};



module.exports.putUsre = async function (req, res, next) {
    try {
        const user = req.body;
        const { firstName, lastName, email, password, /*address,*/ lastVisit } = req.body;
        await userModel.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set:
                {
                    firstName:firstName,
                    lastName:lastName,
                    email: email,
                    password: password,
                    //address: address,
                    lastVisit:lastVisit
                }
            });
        res.send(`user by id ${req.params.id} update`)
    }
    catch (error) {
        next(error)
    }
}



module.exports.getAllOrderByUserId= async function (req, res,next){
    try{
        const userId=req.params.id;
        const id=await userModel.findOne({_id:ObjectId(userId)}).populate({path:'allOrdersByUserId',select:'userId date sum products'});
        await res.send(id);
    }
    catch(error) {
        next(error)
    }
}

module.exports.getAllOrderByUserId= async function (req, res,next){
    try{
        const userId=req.params.id;
        const id=await userModel.findOne({_id:ObjectId(userId)}).populate({path:'allOrdersByUserId',select:'userId date sum products'});
        await res.send(id);
    }
    catch(error) {
        next(error)
    }
}




