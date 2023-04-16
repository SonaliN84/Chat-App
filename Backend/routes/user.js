const express=require('express');

const router=express.Router();

const authController=require('../middleware/auth')
const userController=require('../controllers/user')

router.post('/user/signup',userController.postSignUpUser)

router.post('/user/login',userController.postLoginUser)

router.post('/add-user-to-group',authController.authenticate,userController.postAddUserToGroup)

router.get('/search-user',authController.authenticate,userController.getSearchUser)

router.put('/make-admin',authController.authenticate,userController.putMakeAdmin)

module.exports=router