const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const costumer = require('../middleware/costumer');
const {Product} = require('../models/product');
const {Costumer} = require('../models/costumer');
const { Order, validation,adminAthurized,costumerAthurized } = require('../models/order');


router.get("/api/order", auth, async (req,res)=>{
    if(req.user.isAdmin)
    {
        const orders = await Order.find();
        res.send(orders);
    }
    else if(!req.user.isAdmin)
    {
        const orders = await Order.find({costumerId: req.user._id});
        res.send(orders);
    }
});

router.get("/api/order/:id", auth,async (req,res)=>{
    if(req.user.isAdmin)
    {
        const order = await Order.findById(req.params.id);
        if(order){
            res.send(order);
        }
        else
        {
            res.status(404).send('order not found');
        }
        res.send(orders);
    }
    else if(!req.user.isAdmin)
    {
        const order = await Order.find({_id: req.params.id, costumerId: req.user._id});
        if(order){
            res.send(order);
        }
        else
        {
            res.status(404).send('order not found');
        }
    }
});

router.post("/api/order", [auth,costumer], async (req,res)=>{
    const {error} = validation(req.body);
    if(!error)
    {
        let prod = await Product.findById(req.body.productId);
        let costumer = await Costumer.findById(req.body.costumerId);
        if(prod && costumer)
        {
            let order = new Order(req.body);
            order.price = prod.price;
            const result = await order.save();
            res.send(result);
        }
        else if(!prod)
        {
            res.status(404).send('no such product');
        }  
        else if(!costumer)
        {
            res.status(404).send('no such costumer');
        }
    }
    else{
        res.status(400).send(error.details[0].message);
    }   
});

router.put("/api/order/:id", auth,async (req,res)=>{
    const {error} = validation(req.body)
    if(!error)
    {
        let order = await Order.findById(req.params.id);
        let costumer = await Costumer.findById(req.body.costumerId);
        if(!order){
            res.status(404).send('order not found');
        }
        if(!costumer)
        {
            res.status(400).send('Invalid user');
        }
        if(order.status === 'pending' && (adminAthurized(costumer,req.body.status) || costumerAthurized(costumer,req.body.status)))
        {
            order.status = req.body.status;
            let result = await order.save();
            res.send(result);
        }
        else{
            res.status(400).send('can not Edit');
        }
    }
    else
    {
        res.status(400).send(error.message);
    }
});

module.exports = router;