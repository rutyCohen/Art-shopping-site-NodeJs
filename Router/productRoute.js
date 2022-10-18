const express=require('express');
const router=express.Router();

//const controller= require('../controllerMDB/productController');
const controller = require('../controller/productController');

router.get('/',controller.getAllProducts );

//router.get('/:id',controller.getProductById );

router.get('/category/:id',controller.getProductByCategoryId );

router.post('/',controller.postProduct);

router.delete('/:id',controller.deleteProduct);

router.put('/:id',controller.putProduct);

module.exports=router;
