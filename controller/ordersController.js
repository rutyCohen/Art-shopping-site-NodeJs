const db = require('../DB/mongoose');
const {ObjectId} = require ('mongodb');

const ordersModel= require('../model/orders');
const mongoose = require('mongoose');

module.exports.getAllOrders=async function getAllOrders(req,res, next){
    try{
        const orders=await ordersModel.find().populate('userId');
        await res.send(orders);
    }
    catch(error){
        next(error);

    }

};



module.exports.getMax = async function (req, res, next) {

    try {
        debugger
      //  const order = await orderModel.find().populate('products.product');
        const order=await ordersModel.find().sort({"sum":-1 }).limit(1);
         await res.send(order);
      // await res.send(order);
    }
    catch (error) {
        next(error);
    }

}



module.exports.getOrdersById= async function getOrdersById(req,res, next){
    try{
        const id = req.params.id;
        const ordersId=await ordersModel.findOne(ObjectId(id)).populate('userId');
        if (ordersId)
        await res.send(ordersId);
        else
        await res.status(204).send(ordersId);
    }
    catch(error){
        next(error);

    }
};

module.exports.postOrders=async function postOrders(req,res, next){
    try{
    const addOrders = new ordersModel(req.body);
    const newOrders = await addOrders.save();
    await res.send(newOrders);
    }
    catch(error){
        next(error);

    }
};

module.exports.deleteOrders=async function deleteOrders(req,res, next){
    try{
        const id = req.params.id;
        const toDelete=await ordersModel.deleteOne({ _id: ObjectId(id) });
        await res.send(toDelete);
    }
    catch(error){
        next(error);

    }
};


module.exports.putOrder = async function (req, res, next) {
    try {
        const order = req.body;
        const { date, sum, productId, password, /*address, lastVisit */} = req.body;
        await userModel.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set:
                {
                    date:date,
                    sum:sum,
                    productId: productId,

                }
            });
        res.send(`order by id ${req.params.id} update`)
    }
    catch (error) {
        next(error)
        //  res.send(`error`)
    }
}



