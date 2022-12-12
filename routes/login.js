const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { Costumer, loginValidation } = require('../models/costumer');

router.post("/login", async (req,res)=>{
    const {error} = loginValidation(req.body);
    if(!error)
    {
        let costumer = await Costumer.findOne({ email: req.body.email });
        if(!costumer)
        {
            res.status(400).send('Invalid Email or Password');
        }
        const validPassword = await bcrypt.compare(req.body.password, costumer.password);
        if(!validPassword)
        {
            res.status(400).send('Invalid Email or Password');
        }
        const token = costumer.generateToken();
        res.send(token);
    }
    else{
        res.status(400).send(`error is ${error.details[0].message}`);
    }
});

module.exports = router;