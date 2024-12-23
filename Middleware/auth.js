const jwt=require('jsonwebtoken');

function authToken(req,resp,next){

const token=req.headers['authorization'];
if(!token){
     console.log("not found");
    
    return resp.send({message:'token not found'});
}
jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err){
        console.log('invalid token');
        
        return(resp.send({message:'invalid token'}));
    }
     console.log('token verified');
    
        req.user=user;
        next(); 
    
})

}


module.exports=authToken;