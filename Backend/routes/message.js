const express=require('express');

const router=express.Router();
const authController=require('../middleware/auth')
const messageController=require('../controllers/message')

router.post('/send-message',authController.authenticate,messageController.postMessage)

module.exports=router