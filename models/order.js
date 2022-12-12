const joi = require('joi');
const mongoose = require('mongoose');
const {Product} = require('./product');
const {Costumer} = require('./costumer');

let Order = mongoose.model("order", 
    new mongoose.Schema({
        costumerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Costumer,
            requierd:true
        },
        productId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: Product
        },
        status:{
            type: String,
            required: false,
            enum: ['pending', 'accepted', 'rejected', 'canceled'],
            default: 'pending'
        },
        price:{
            type: Number,
            requierd: true,
            min: 0,
            max: 10000,
        },
        publishedAt: {
            type: Date,
            default: Date.now
        }
    })
);

function validation(order)
{
    const s = joi.object({
        costumerId: joi.required(),
        productId: joi.required(),
        status: joi.string(),
        price: joi.number().min(0).max(10000)
    });

    return s.validate(order);
}

function adminAthurized(costumer,status)
{
    return costumer.isAdmin && (status === 'accepted' || status === 'rejected');
}

function costumerAthurized(costumer,status)
{
    return ((!costumer.isAdmin) && (status === 'canceled'));
}

exports.Order = Order;
exports.validation = validation;
exports.adminAthurized = adminAthurized;
exports.costumerAthurized = costumerAthurized;
