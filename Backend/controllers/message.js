const Message=require('../models/message')

function isStringInValid(string){
    if(string===undefined || string==null ||string.trim().length===0){
        return true;
    }
    else{
        return false;
    }
}

exports.postMessage=async(req,res,next)=>{
    try{
    const {message}=req.body;
    console.log(">>>>>>>",message)
    
    if(isStringInValid(message))
    {
        return res.status(400).json({err:"Please enter valid message"})
    }

  await req.user.createMessage({name:req.user.name,message:message})

  res.status(201).json({message:"message sent successfully"})
    }
    catch(err){
        res.status(500).json({error:"Something went wrong"})
    }

}

exports.getMessage=async(req,res,next)=>{
    try{
   const messages=await Message.findAll();
    console.log(">>>>>>messages>>>",messages)
   res.status(200).json(messages)
    }
    catch(err){
        console.log(err)
    }
}