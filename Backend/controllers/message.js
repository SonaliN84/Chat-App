const Message = require("../models/message");
const { Op, where } = require("sequelize");
const Group=require('../models/group')
const UserGroup=require('../models/usergroup')
const io=require('../socket')
const AWS=require('aws-sdk');
const ArchivedMessage=require('../models/archivedmessages')
function isStringInValid(string) {
  if (string === undefined || string == null || string.trim().length === 0) {
    return true;
  } else {
    return false;
  }
}


exports.getMessage = async (req, res, next) => {
  try {
    const groupId=req.query.groupId
   
    // const total = await Message.count();
    // let limit = 30;

    // let offset = total - limit;
    // if (offset < 0) {
    //   offset = 0;
    // }

    const previousmessages=await ArchivedMessage.findAll({ where:{groupId:groupId}})

    
    const currentmessages = await Message.findAll({ where:{groupId:groupId}});
    console.log(">>>>>>messages>>>", previousmessages);
    let newmessage=[...previousmessages,...currentmessages]
    res.status(200).json(newmessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"Something went wrong"})
  }
};

exports.postMessage = async (req, res, next) => {
  try {
    const { message} = req.body;
    const {groupId}=req.query;
    let uploadFile = req.file
    console.log("UPLOADEDFILE>>>>>>>>>>>>>",uploadFile)
    console.log(">>>>>>>", message);
    console.log(">>>>>>>", groupId);
 
    const response=await UserGroup.findAll({where:{userId:req.user.id,groupId:groupId}})
    console.log("RESPONSE",response)
    if(response.length==0){
      return res.status(400).json({error:"You are no longer member of this group"})
    }

    if (isStringInValid(message)) {
      
     if(uploadFile)
     {
      const filename=uploadFile.originalname

      const fileURL=await uploadToS3(uploadFile.buffer,filename);

      const newmessage=await req.user.createMessage({ name: req.user.name, message: fileURL, groupId:groupId,url:true});
      io.getIO().to(+groupId).emit('post',{action:'created',message:newmessage})
      return res.status(201).json({ message: "message sent successfully" });
     }
     return res.status(400).json({ err: "Please enter valid message" });
    }
    

      const newmessage=await req.user.createMessage({ name: req.user.name, message: message, groupId:groupId,url:false });
      
      console.log("NEWMESSAGE",newmessage.dataValues)
       
        io.getIO().to(+groupId).emit('post',{action:'created',message:newmessage})
    
      res.status(201).json({ message: "message sent successfully" });
  
    
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};



const uploadToS3=(data,filename)=>{
  const BUCKET_NAME=process.env.AWS_IAM_BUCKET_NAME;
  const IAM_USER_KEY=process.env.AWS_IAM_ACCESS_KEY;
  const IAM_USER_SECRET=process.env.AWS_IAM_SECRET_KEY;
  console.log("IAM_USER_KEY>>>>>>>>",IAM_USER_KEY)
  console.log("IAM_USER_SECRET>>>>>>>>",IAM_USER_SECRET)

  let s3bucket=new AWS.S3({
   accessKeyId:IAM_USER_KEY,
   secretAccessKey:IAM_USER_SECRET,
   
  })
 console.log("FILEDATA>>>>>")
  
   var params={
       Bucket:BUCKET_NAME,
       Key:filename,
       Body:data,
       ACL:'public-read'
   }

   return new Promise((resolve,reject)=>{
       s3bucket.upload(params,(err,s3response)=>{
           if(err){
               console.log("Something went wrong",err)
               reject("Something went wrong")
           }
           else{
               console.log("success",s3response)
               console.log(s3response.Location)
               resolve(s3response.Location)
           }
       })
   })
 
 
}





