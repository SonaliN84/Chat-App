const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { Op } = require("sequelize")
const Group = require('../models/group')
const UserGroup = require('../models/usergroup')

function generateAccessToken(id){
    return jwt.sign({userId:id},process.env.TOKEN_SECRET_KEY)

}
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

exports.postLoginUser=async(req,res,next)=>{
try{
 const {email,password}=req.body;
 console.log(">>>>>>>",email,password)

 if(isStringInValid(email) || isStringInValid(password))
 {
    return res.status(400).json({err:"Email id or password is missing",success:false})
 }
 const users=await User.findAll({where:{email:email}})
 const user=users[0];
 if(!user){
    return res.status(404).json({err:"User not found",success:false})
 }
 bcrypt.compare(password,user.password,(err,result)=>{
    if(err){
        throw new Error("Something went wrong")
    }
    if(result===true){
        res.status(200).json({message:"User logged in successfully",success:true,token:generateAccessToken(user.id),userName:user.name,userId:user.id})
    }
    else{
        res.status(401).json({err:"Incorrect passowrd",success:false})
    }
 })
}
catch(err){
    res.status(500).json({message:err,success:false})
}

}

exports.getSearchUser=async(req,res,next)=>{
    try{
    const {data}=req.query;
    const users= await User.findAll({where:{[Op.or]:[{email:data },{phonenumber:data},{name:data}]},attributes:['id','name','email']})
    console.log("USERS>>>",users)
    res.status(200).json({users:users,success:true})
    }
    catch(err){
     res.status(500).json({message:"something went wrong"})
    }
}

exports.postAddUserToGroup=async(req,res,next)=>{
    try{
    const {groupId,userId}=req.body;
    console.log(">>>>>",groupId,userId)
   const groups=await Group.findAll({where:{id:groupId}})
   const group=groups[0];
   const users=await User.findAll({where:{id:userId}})
   const user=users[0]
   await group.addUser(user)
    res.status(200).json({message:"User added to group successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

exports.putMakeAdmin=async(req,res,next)=>{
   const {userId,groupId}=req.body;
   const result=await UserGroup.findAll({where:{userId:userId,groupId:groupId}})
   const ans=result[0]
   ans.admin=true;
   await ans.save()
   res.status(200).json({success:true})
}