const express=require('express');
const router=express.Router();

//const controller= require('../controllerMDB/productController');
const controller = require('../controller/ordersController');

router.get('/',controller.getMax );

router.get('/:id',controller.getOrdersById );

router.post('/',controller.postOrders);

router.delete('/:id',controller.deleteOrders);


module.exports=router;