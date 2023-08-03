const userService=require('../services/user-service');
const UserService=new userService();

const create=async (req,res)=>{
    try {
        const response=await UserService.create({
            email:req.body.email,
            password:req.body.password
        })
        return res.status(201).json({
            success:true,
            data:response,
            message:'successfully created a new user',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            data:{},
            message:'something went wrong',
            err: error
        })
    }
}

module.exports={
    create
}