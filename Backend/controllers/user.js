const User=require('../models/user')
const bcrypt=require('bcrypt')
const { Op } = require("sequelize")
function isStringInValid(string){
    if(string===undefined || string==null ||string.trim().length===0){
        return true;
    }
    else{
        return false;
    }
}
function isNumberInValid(number){
   if(number===undefined||number==null ||number<0 || number.length!=10){
    return true;
   }
   else{
    return false;
   }
}
exports.postSignUpUser=async(req,res,next)=>{
    try{
   const {name,email,phonenumber,password}=req.body;

   console.log(name)
   if(isStringInValid(name) || isStringInValid(email) || isStringInValid(password) || isNumberInValid(phonenumber)){
    return res.status(400).json({err:"Bad Parameters...Something is missing"})
   }
   
   const users=await User.findAll({where:{[Op.or]:[{email:email },{phonenumber:phonenumber}]}})
   const user=users[0]
   if(user){
    return res.status(500).json({err:"Email or Phone number already exist"})
   }
   

   const saltrounds=10;
   bcrypt.hash(password,saltrounds,async(err,hash)=>{
    console.log(err)
    await User.create({
        name:name,
        email:email,
        phonenumber:phonenumber,
        password:hash
    })
    res.status(201).json({message:"You are successfully signed up",success:true})

   })
}
catch(err){
    res.status(500).json({err:err,success:false})
}

}