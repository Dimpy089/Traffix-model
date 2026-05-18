const jwt=require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({message:'No token,authorization denied'});
    }
    const actualtoken=token.split(' ')[1];
    try{
        const decode=jwt.verify(actualtoken,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch(err){
        res.status(401).json({message:'Token is not valid'});
    }
};

module.exports=authMiddleware;