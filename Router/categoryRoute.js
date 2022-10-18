const express=require('express');
const router=express.Router();

//const controller= require('../controllerMDB/productController');
const controller = require('../controller/categoryController');

router.get('/',controller.getAllCategory );

router.get('/:id',controller.getCategoryById );

router.post('/',controller.postCategory);

router.delete('/:id',controller.deleteCategory);

router.put('/:id',controller.putCategory);

module.exports=router;