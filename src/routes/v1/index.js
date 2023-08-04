const express=require('express');

const userController=require('../../controllers/user-controller');
const router=express.Router();

router.post('/signUp',userController.create);
router.post('/signIn',userController.singIn);

module.exports=router;