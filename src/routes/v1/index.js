const express=require('express');

const userController=require('../../controllers/user-controller');
const {authMiddleware}=require('../../middlewares/index')
const router=express.Router();

router.post('/signUp',authMiddleware.validateAuth,userController.create);
router.post('/signIn',authMiddleware.validateAuth,userController.singIn);
router.get('/isAuthenticated',userController.isAuthenticated);
router.get('/isAdmin',authMiddleware.validateAdminRequest,userController.isAdmin);

module.exports=router;