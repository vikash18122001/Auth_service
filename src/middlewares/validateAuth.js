const validateAuth=async (req,res,next)=>{
    if( !req.body.email || !req.body.password)
    {
        return res.status(400).json({
            success: false,
            message: 'something went wrong',
            error: 'missing email or password in request',
            data :{}
        })
    }
    next();
}
const validateAdminRequest=async (req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            error:'missing user id',
            message:'something went wrong',
            success:false
        })
    }
    next();
}
module.exports={
    validateAuth,
    validateAdminRequest
}