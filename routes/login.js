const express = require('express');
const Joi = require('joi');
const app = express()
const { User, validateUser } = require('../user_model');
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/', async (req, res, next) => {
    let validateUserDetails = await validateLogin(req.body);
    console.log(validateUserDetails)
    if (validateUserDetails.error) {
        res.status(400).send("Invalid User Details, Please try with other Details")
    } else {
        let userDetails = await User.findOne({ email: req.body.email });
        if (!userDetails) {
            res.status(400).send("Email Not Exists, Please Register First....")
        } else {
            let passwordCheck = bcrypt.compare(req.body.passwordC, userDetails.password)
            if (!passwordCheck)
                res.status(400).send("Invalid Password,Please Check")
            const token = jwt.sign({ _id: userDetails._id }, 'Secretkey');
            res.status(200).send(token)

        }
    }

})

//get all user details
router.get('/', async (req, res, next) => {
    let data = await User.find()
    res.status(200).send(data)
})

//get user by id
router.get('/:id', async (req, res, next) => {
    let data = await User.findById(req.params.id)
    res.status(200).send(data)
})

router.delete('/:id', async (req, res) => {
    const data = await User.findByIdAndRemove(req.params.id);
    res.status(200).send(data)
})


async function validateLogin(user) {
    const schema = Joi.object(
        {
            password: Joi.string().required(),
            email: Joi.string().required(),

        }

    )
    return schema.validate(user)
}




module.exports = router