const db = require('../DB/db');
const {ObjectId} = require ('mongodb');

exports.getAll=async function getAll(req,res){
    const products=await db.getDB().collection("product").find().toArray();
    res.send(products);
};

exports.getProductById= async function getProductById(req,res){
    const id = req.params.id;
    const productsId=await db.getDB().collection("product").findOne(ObjectId(id));
    res.send(productsId);
};

exports.postProduct=async function postProduct(req,res){
    if(req.body){
        const myProduct=req.body;
        const {name, description, price} = myProduct;
        const document={name: name, description: description, price: price};
        const productToInsert=await db.getDB().collection("product").insertOne(document);
        res.send(productToInsert);       
    }

};

exports.deleteProduct=async function deleteProduct(req,res){
    const id = req.body.id;
    const productToDelete=await db.getDB().collection("product").deleteOne({"id":id});
    res.send(productToDelete);
};

exports.putProduct =async function putProduct(req,res){
    const myUser =req.body.id;
    const productDescription=req.body.description;
    const productName=req.body.name;
    const productPrice=req.body.price;

    const productToUpdate=await db.getDB().collection("product").findOneAndUpdate({id:myUser},{$set:{description:productDescription}},{$set:{name:productName}},{$set:{price:productPrice}});
    await res.send(productToUpdate);
}
