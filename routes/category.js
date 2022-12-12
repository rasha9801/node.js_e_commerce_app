const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Category, validation} = require('../models/category');

router.get("/api/category/:id", async (req,res)=>{
    const category = await Category.findById(req.params.id);
    if(category){
        res.send(category);
    }
    else
    {
        res.status(404).send('category not found');
    }
});

router.post("/api/category",[auth, admin] , async (req,res)=>{
    const {error} = validation(req.body);
    if(!error)
    {
        let category = new Category(req.body);
        const result = await category.save();
        res.send(result);
    }
    else
    {
        res.status(400).send(error.details[0].message);
    }
});

router.put("/api/category/:id",[auth,admin], async (req,res)=>{
    const {error} = validation(req.body)
    if(!error)
    {
        let category = await Category.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if(!category){
            res.status(404).send('category not found');
        }
        res.send(category);
    }
    else
    {
        res.status(400).send(error.message);
    }
});

router.delete("/api/category/:id",[auth, admin], async (req,res)=>{
    let category = await Category.findByIdAndDelete(req.params.id);
    if(!category){
        res.status(404).send('category not found');
    }
    res.send(category);
});

module.exports = router;