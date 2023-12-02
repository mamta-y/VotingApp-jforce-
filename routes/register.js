const express = require('express');
const Joi = require('joi');
const app = express()
const mongoose = require('mongoose');
const { User, validateUser } = require('../user_model');
const router = express.Router()
const lodash= require('lodash')
const bcrypt= require('bcrypt')

router.post('/', async (req, res, next) => {
    let validateUserDetails = await validateUser(req.body);
    console.log(validateUserDetails)
    if (validateUserDetails.error) {
        res.status(400).send("Invalid User Details, Please try with other Details")
    }else{
    let userDetails =  await User.findOne({ email: req.body.email });
    if (userDetails) {
        res.status(400).send("Email Already Exists, Please try with other email")
    }else{

    userDetails = new User(lodash.pick(req.body, ["name", "password", "email", "age", "phoneNumber"]))
    let salt =  await bcrypt.genSalt(10)
    userDetails.password = await bcrypt.hash(userDetails.password, salt)
    userDetails = await userDetails.save();
    res.status(200).send("User Registered Successfully........")
    }
}
})


module.exports=router