const Message = require("../models/message");
const { Op, where } = require("sequelize");
const Group=require('../models/group')
const UserGroup=require('../models/usergroup')
function isStringInValid(string) {
  if (string === undefined || string == null || string.trim().length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.postMessage = async (req, res, next) => {
  try {
    const { message} = req.body;
    const {groupId}=req.query
    console.log(">>>>>>>", message);
    console.log(">>>>>>>", groupId);

    if (isStringInValid(message)) {
      return res.status(400).json({ err: "Please enter valid message" });
    }
    const response=await UserGroup.findAll({where:{userId:req.user.id,groupId:groupId}})
    console.log("RESPONSE",response)
    if(response.length==0){
      return res.status(400).json({error:"You are no longer member of this group"})
    }

      await req.user.createMessage({ name: req.user.name, message: message, groupId:groupId });

      res.status(201).json({ message: "message sent successfully" });
  
    
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const groupId=req.query.groupId
    const lastId = req.query.lastId;
    const response=await UserGroup.findAll({where:{userId:req.user.id,groupId:groupId}})
    console.log("RESPONSE",response)
    if(response.length==0){
      return res.status(400).json({error:"You are no longer member of this group"})
    }
    if (lastId) {
      const messages = await Message.findAll({
        where: { id: { [Op.gt]: lastId } ,groupId:groupId},
      });

      return res.status(200).json({ messages });
    }
    

    const total = await Message.count();
    let limit = 30;

    let offset = total - limit;
    if (offset < 0) {
      offset = 0;
    }

    const messages = await Message.findAll({ where:{groupId:groupId},offset, limit });
    console.log(">>>>>>messages>>>", messages);
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"Something went wrong"})
  }
};
