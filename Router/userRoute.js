const express=require('express');
const router=express.Router();

//const controller= require('../controllerMDB/userController')
const controller = require('../controller/userController');

router.get('/',controller.getAll );



router.get('/:id',controller.getAllOrderByUserId );

router.get('/:email/:password',controller.getByEmailAndPassword );

router.post('/',controller.postUser);

router.delete('/:id',controller.deleteUsre);

router.put('/:id',controller.putUsre);


module.exports=router;
