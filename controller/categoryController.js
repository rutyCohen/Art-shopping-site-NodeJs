const db = require('../DB/mongoose');
const {ObjectId} = require ('mongodb');

const categoryModel= require('../model/category');
const mongoose = require('mongoose');

const logconfig = require('../Logger/configuration');
const winston = require('winston')
const logger = winston.createLogger(logconfig);

module.exports.getAllCategory=async function getAllCategory(req,res,next){
    try{
        const category=await categoryModel.find();
        await res.send(category);
    }
    catch(error){
        next(error);

    }

};

module.exports.getCategoryById= async function getCategoryById(req,res, next){
    try{
        const id = req.params.id;
        const categoryId=await categoryModel.findOne(ObjectId(id));
        await res.send(categoryId);
    }
    catch(error){
        next(error);

    }
};

module.exports.postCategory=async function postCategory(req,res, next){
    try{
     const addCategory = new categoryModel(req.body);
    const newCategory = await addCategory.save();
    await res.send(newCategory);
    }
    catch(error){
        next(error);

    }
};

module.exports.deleteCategory=async function deleteCategory(req,res, next){
    try{
        const id = req.body.id;
        const toDelete=await categoryModel.deleteOne({"id":id});
        await res.send(toDelete);
    }
    catch(error){
        next(error);

    }
};

module.exports.putCategory=async function putCategory(req,res, next){
if(req.body){
    const id=req.params.id;
try{

    const {name}=req.body;

    const data={name:name}
    const toUpdate=await userModel.findOneAndUpdate(id,data,{new:true});

    await res.send(toUpdate);
}
catch(error){
    next(error);

}
};
}


