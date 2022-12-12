const lodash = require('lodash');
const express = require('express');
const router = express.Router();
const { Costumer, registValidation } = require('../models/costumer');

// router.get("/api/costumer/:id", async (req,res)=>{
//     const costumer = await Costumer.findById(req.params.id);
//     if(costumer){
//         res.send(costumer);
//     }
//     else
//     {
//         res.status(404).send('costumer not found');
//     }
// });

router.post("/api/regist", async (req,res)=>{
    const {error} = registValidation(req.body);
    if(!error)
    {
        let ex_costumer = await Costumer.findOne({ email: req.body.email });
        if(ex_costumer)
        {
            res.status(400).send(`Email in use ${ex_costumer}`);
        }
        else
        {
            let costumer = new Costumer(req.body);
            costumer = await costumer.passwordHash();
            const result = await costumer.save();
            res.send(lodash.pick(result,["_id", "name", "email"]));
        }
    }
    else{
        res.status(400).send(`error is ${error.details[0].message}`);
    }
});

// router.put("/api/costumer/:id", async (req,res)=>{
//     const {error} = registValidation(req.body)
//     if(!error)
//     {
//         let costumer = await Costumer.findByIdAndUpdate(req.params.id,req.body,{ new: true });
//         if(!costumer){
//             res.status(404).send('costumer not found');
//         }
//         res.send(costumer);
//     }
//     else{
//         res.status(400).send(error.message);
//     }
// });

module.exports = router;