const joi = require('joi');
const mongoose = require('mongoose');

let Category = mongoose.model("category", 
    new mongoose.Schema({
        name: {
            type: String,
            minlength:3,
            maxlength: 50,
            requierd: true,
            lowercase: true
        }
    })
);

function validation(category)
{
    const s = joi.object({
        name: joi.string().lowercase().min(3).max(50).required(),
    });
    return s.validate(category);
}

exports.Category = Category;
exports.validation = validation;