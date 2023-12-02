const express = require('express');
const Joi = require('joi');
const app = express()
const mongoose = require('mongoose');

const OptionSchema = new Schema({
    value: {type: String, required: true},
    votes: {type: Number, default: 0}
  });

const Vote = mongoose.model('Vote', new mongoose.Schema({
    name:{
        type:String
       // required:true
    },
    options: {
        type: [OptionSchema]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    users: 
    [{type: Schema.Types.ObjectId,
         ref: 'User'}] // authenticated users who voted in this poll
}))

module.exports.Vote=Vote