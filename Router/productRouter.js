const express=require('express');
const product=express.Router();

const controller= require('../controller/productController');

router.get('/',controller.getAll );

router.get('/:id',controller.getProductById );

router.post('/',controller.postProduct);

router.delete('/:id',controller.deleteProduct);

router.put('/:id',controller.putProduct);

module.exports=product;