const { User ,validateUser} = require('../user_model');

function checking(req,res,next){
const  role=  User.findOne({ role: req.body.role });
   if(role!=='admin')
       return res.status(401).send('Only Admin can Access This...');
     next();
    
}
    module.exports=checking;