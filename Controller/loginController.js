const connectdb=require ('../Db/db');
const jwt = require('jsonwebtoken');


async function userLogin(req,resp) {

    // console.log(req.body);
    const {username,password}=req.body;
    const query='SELECT * FROM users WHERE username = ?';


    connectdb.query(query,[username],async (error,result)=>{
        
        if(error)
            {
            return (resp.status(500).json({success:false,message:'Database Connection Error'}))
        }
            if(result.length>0){
                // console.log('result in logging',result[0].id);
                
                const user_id=result[0].id;
                // const isUser=await bcrypt.compare(password,result[0].password);
                const isUser= password===result[0].password
                if(isUser){
                    const jwtToken=jwt.sign({id:user_id},process.env.JWT);
                    return resp.json({success:true,jwtToken,userId:result[0].id});
                }
                else{
                    return(resp.json({success:false,message:'invalid password'}));
                }
            
            }
            else{
                return(resp.json({success:false,message:'user not found'}));
            }
        
    })    
}


module.exports=userLogin;