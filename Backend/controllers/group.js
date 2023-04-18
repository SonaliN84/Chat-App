const Group = require("../models/group");
const User = require("../models/user");
const { Op } = require("sequelize");
const UserGroup = require("../models/usergroup");
const io=require('../socket')
exports.postCreateGroup = async (req, res, next) => {
  try {
    const { name, createdbyname, createdbyid } = req.body;

    const group = await Group.create({
      name: name,
      createdbyname: createdbyname,
      createdbyid: createdbyid,
    });

    const ans=await req.user.addGroup(group, { through: { admin: true } });
    console.log("ANSWER>>>>>>>>>>>>>>>",ans)
    res.status(201).json({...group,usergroup:ans[0]});
  } catch (err) {
    res.status(500).json({ err: err, success: false });
  }
};

exports.getGroup = async (req, res, next) => {
  //     try{

  //      const lastId = req.query.lastId;
  //      console.log("LASTID>>>>>>",lastId)
  //      if (lastId) {
  //      const groups = await req.user.getGroups({
  //             where: { id: { [Op.gt]: lastId }},
  //           });
  //           console.log("GROUPS>>>>>",groups)
  //         return res.status(200).json(groups);
  //         }

  //    const groups= await req.user.getGroups()
  //    console.log(groups)
  //    res.status(200).json(groups)
  //     }
  //     catch(err){
  //         res.status(500).json({err:err,success:false})
  //     }

  const userId = req.user.id;
  const { lastId } = req.query;

  if (lastId) {
    const groups = await UserGroup.findAll({
      where: { id: { [Op.gt]: lastId }, userId: userId },
    });

    if (groups.length > 0) {
      const group = groups[0];
      const id = group.groupId;
      const ans = await Group.findByPk(id);
      return res.status(200).json({ group, ans });
    }
    return res.status(200).json({ group: {}, ans: {} });
  } else {
    const groups = await req.user.getGroups();
    console.log(groups);
    res.status(200).json(groups);
  }
};

exports.getGroupMembers = async (req, res, next) => {
  const { groupId } = req.query;

  const groups = await Group.findAll({ where: { id: groupId } });
  console.log("Groups", groups);
  const group = groups[0];
  console.log("GROUP", group);
  const users = await group.getUsers({
    attributes: ["id", "name", "email", "phonenumber"],
  });
  res.status(200).json(users);
};

exports.deleteMember = async (req, res, next) => {
  const { userId, groupId } = req.query;

  const group = await Group.findByPk(groupId);
  const user = await User.findByPk(userId);
  
  group.removeUser(user);
  io.getIO().emit('removeFromGroup',{userId:userId,groupId:groupId})
  res.status(200).json({ message: "deleted successfully" });
};
