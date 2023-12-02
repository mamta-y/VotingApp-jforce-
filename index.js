const express = require('express');
const app = express()
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login')
const voting = require('./routes/vote')

mongoose.connect('mongodb://localhost:27017/vote')
.then(()=>console.log("Connected To Database"))
.catch(err=>console.log("Error while connecting to Database"))

app.use(express.json());

app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/vote',voting);

const port = process.env.port||3000
app.listen(port,()=>console.log(`Listening to ${port}`))
