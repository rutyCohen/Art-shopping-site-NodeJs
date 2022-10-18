const db = require('../DB/db');
const {ObjectId} = require ('mongodb');

exports.getAll=async function getAll(req,res){
    const users=await db.getDB().collection("user").find().toArray();
    res.send(users);
};

exports.getById= async function getById(req,res){
    const id = req.params.id;
    const userId=await db.getDB().collection("user").findOne(ObjectId(id));
    res.send(userId);
};

exports.postUsre=async function postUsre(req,res){
    if(req.body){
        const myUser=req.body;
        const {name, email, password} = myUser;
        const document={name: name, email: email, password: password};
        const toInsert=await db.getDB().collection("user").insertOne(document);
        res.send(toInsert);        
    }

};

exports.deleteUsre=async function deleteUsre(req,res){
    const id = req.body.id;
    const toDelete=await db.getDB().collection("user").deleteOne({"id":id});
    res.send(toDelete);
};

exports.putUsre=async function putUsre(req,res){
    const myUser =req.body.id;
    const myUserp=req.body.password;
    const myUsern=req.body.name;
    const myUsere=req.body.email;

    const toUpdate=await db.getDB().collection("user").findOneAndUpdate({id:myUser},{$set:{password:myUserp}},{$set:{name:myUsern}},{$set:{email:myUsere}});
    await res.send(toUpdate);

};



