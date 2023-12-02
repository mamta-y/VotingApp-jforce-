const express = require('express');
const Joi = require('joi');
const app = express()
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name:{
        type:String
       // required:true
    },
    password:{
        type:String
      //  required:true
    },
    email:{
        type:String
      //  required:true
    },
    age:{
        tyep:Number
      //  required:true
    },
    phoneNumber:{
        type:Number
       // required:true
    }   
//role:{
// type:String,
// default:'user'
//     }
}))

async function validateUser(user){
    const schema = Joi.object(
        {
            name:Joi.string().required(),
            password:Joi.string().required(),
            email:Joi.string().required(),
            age:Joi.number().required(),
            phoneNumber:Joi.number().required(),
           // role:Joi.string()

        }
       
    )
    return schema.validate(user)
}

module.exports.User= User
module.exports.validateUser= validateUser