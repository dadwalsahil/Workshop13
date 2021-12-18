var jwt = require("jsonwebtoken");
var router = require("../route/user");



module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
         jwt.verify(token , "Sahil" , (error , result)=>{
            if(error){
                console.log(error);
            }
            else{
                next();
            }

            
        });
         
  
    } 
    catch{
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}