const express=require('express');

const router=express.Router();
const authController=require('../middleware/auth')
const groupController=require('../controllers/group')

router.post('/create-group',authController.authenticate,groupController.postCreateGroup)
router.get('/get-groups',authController.authenticate,groupController.getGroup)
router.get('/get-group-members',authController.authenticate,groupController.getGroupMembers)
router.delete('/delete-member',authController.authenticate,groupController.deleteMember)






module.exports=router