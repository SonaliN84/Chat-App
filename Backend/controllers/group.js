const Group=require('../models/group')

exports.postCreateGroup=async(req,res,next)=>{
 try{
 const {name,adminname,adminid}=req.body
 console.log(">>>>>>>>>>>>>adminid",adminid)
  const group=await Group.create({
      name:name,
      adminname:adminname,
      adminid:adminid
   })

   await req.user.addGroup(group)
   res.status(201).json(group)
}
catch(err){
    res.status(500).json({err:err,success:false})
}
}

exports.getGroup=async(req,res,next)=>{
    try{
   const groups= await req.user.getGroups()
   console.log(groups)
   res.status(200).json(groups)
    }
    catch(err){
        res.status(500).json({err:err,success:false})
    }
}