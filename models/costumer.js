const joi = require('joi');
const config = require('electron-node-config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const costumerSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: true,
        lowercase: true,
        minlength: 3,
        maxlength: 100
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 100,
        match: /.+@[a-z]+.com/
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
});

costumerSchema.methods.generateToken = function(){
    return jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, config.get("PrivatKey"));
}

costumerSchema.methods.passwordHash = async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return this;
}

let Costumer = mongoose.model("costumer", costumerSchema);

function registValidation(costumer)
{
    const s = joi.object({
        name: joi.string().lowercase().min(3).max(100).required(),
        email: joi.string().min(10).max(100).required().email().pattern(new RegExp('.+@[a-z]+.com')),
        password: joi.string().min(5).max(100).required(),
        isAdmin: joi.boolean().valid(true)
    });

    return s.validate(costumer);
}

function loginValidation(costumer)
{
    const s = joi.object({
        email: joi.string().min(10).max(100).required().email().pattern(new RegExp('.+@[a-z]+.com')),
        password: joi.string().min(5).max(100).required(),
    });

    return s.validate(costumer);
}

exports.Costumer = Costumer;
exports.registValidation = registValidation;
exports.loginValidation = loginValidation;