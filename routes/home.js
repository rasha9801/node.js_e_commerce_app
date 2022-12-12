const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');
const {Product} = require('../models/product');

router.get("/", async (req,res)=>{
    let categories = await Category.find();
    let products = await Product.find().limit(10);
    res.send({'category': categories, 'product': products});
});

module.exports = router;