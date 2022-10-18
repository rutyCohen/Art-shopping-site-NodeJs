const db = require('../DB/mongoose');
const { ObjectId } = require('mongodb');

const productModel = require('../model/product');
const mongoose = require('mongoose');

module.exports.getAllProducts = async function getAllProducts(req, res, next) {
    try {
        const products = await productModel.find().populate('categryId');
        await res.send(products);
    }
    catch(error){
        next(error);

    }

};

module.exports.getProductByCategoryId = async function(req, res, next) {
    try {
        const id = req.params.id;
        const products = await productModel.where({categryId: ObjectId(id)}).populate('categryId');
        await res.send(products);
    }
    catch(error){
        next(error);

    }
};

module.exports.postProduct = async function postProduct(req, res, next) {
    try {

        const addProduct = new productModel(req.body);
        const newProduct = await addProduct.save();
        await res.send(newProduct);
    }
    catch(error){
        next(error);

    }
};

module.exports.deleteProduct = async function deleteProduct(req, res, next) {
    try {
        const id = req.body.id;
        const toDelete = await productModel.deleteOne({ "id": id });
        await res.send(toDelete);
    }
    catch(error){
        next(error);

    }
};

module.exports.putProduct = async function putProduct(req, res, next) {
    if (req.body) {
        const id = req.params.id;
        try {
            const { categryId, name, price, desc, Images } = req.body;
            const data = { categryId: categryId, name: name, price: price, desc: desc, Images: Images }
            console.log(data,"daddta");
            const toUpdate = await productModel.findOneAndUpdate(id, data, { new: true });
            await res.send(toUpdate);
        }
        catch(error){
            next(error);
        }
    };
}
