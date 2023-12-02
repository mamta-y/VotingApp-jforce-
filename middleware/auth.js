const jwt=require('jsonwebtoken');


function auth(req,res,next){
const token= req.header('auth-token');//
 if(!token) return res.status(401).send('Access Deneid!!!');
 try{
const decodedtoken=jwt.verify(token,'Secretkey')
next();
}
catch(err){
    res.status(400).send('Token Invalid.....')
}}

module.exports=auth;