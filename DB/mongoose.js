const mongoose = require ('mongoose');
const {CONNECTION_STRING} = require('../config');
class MongooseDB {
    constructor(){}
    async conect(){
        const url=CONNECTION_STRING;
        await mongoose.connect(url);
        console.log(`moggooseDB connected`);
    }

}

module.exports= new MongooseDB();
