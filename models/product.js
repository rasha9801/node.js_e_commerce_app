const joi = require('joi');
const mongoose = require('mongoose');
const {Category} = require('./category');

let Product = mongoose.model("product", 
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            lowercase: true,
            minlength: 3,
            maxlength: 100
        },
        categoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Category,
            required: true
        },
        description:{
            type: String,
            required: false,
            minlength: 10,
            maxlength: 100
        },
        price:{
            type: Number,
            required:true,
            min: 0,
            max: 100
        },
        available:{
            type: Number,
            required: true,
            min:0,
        },
        publishedAt: {
            type: Date,
            default: Date.now
        }
    })
);

function validation(product)
{
    const s = joi.object({
        name: joi.string().lowercase().min(3).max(100).required(),
        categoryId: joi.required(),
        description: joi.string().min(10).max(100),
        price: joi.number().min(0).max(100).required(),
        available: joi.number().min(0).required()
    });

    return s.validate(product);
}

async function getProductByCategoryId(value){
    const res = await Product.find({
        category: value
    })
    .limit(10);
    return res;
    // console.log(res);
}

exports.Product = Product;
exports.validation = validation;
