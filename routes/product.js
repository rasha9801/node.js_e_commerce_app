const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Category} = require('../models/category');
const {Product, validation} = require('../models/product');

router.get("/api/product/:id", async (req,res)=>{
    const product = await Product.findById(req.params.id); 
    if(product){
        res.send(product);
    }
    else
    {
        res.status(404).send('product not found');
    }
});

router.post("/api/product", [auth, admin], async (req,res)=>{
    const {error} = validation(req.body);
    if(!error)
    {
        let category = await Category.findById(req.body.categoryId);
        if(category)
        {
            let product = new Product(req.body);
            let result = await product.save();
            res.send(result);
        }
    }
    else
    {
        res.status(400).send(error.details[0].message);
    }
});

router.put("/api/product/:id", [auth, admin], async (req,res)=>{
    const {error} = validation(req.body)
    if(!error)
    {
        let product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if(!product){
            res.status(404).send('product not found');
        }
        res.send(product);
    }
    else{
        res.status(400).send(error.message);
    }
});

router.delete("/api/product/:id", [auth, admin], async (req,res)=>{
    let product = await Product.findByIdAndDelete(req.params.id);
    if(!product)
    {
        res.status(404).send('category not found');
    }
    res.send(product);
});

module.exports = router;