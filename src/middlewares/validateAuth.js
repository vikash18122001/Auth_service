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
module.exports={
    validateAuth
}