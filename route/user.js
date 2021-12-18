const User = require("../model/schema");
const router = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");
const res = require("express/lib/response");
// const app = express();


router.post("/", async(req , res) => {
   
   const salt= await bcrypt.genSalt();
    bcrypt.hash(req.body.Password,salt,(err,hash)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(hash)
            const user = new User({
                employeeID :req.body.employeeID,
                Password:hash,
                employeeName :req.body.employeeName,
                employeeRole : req.body.employeeRole
            })
            user.save().then(result=>{
                console.log("resolve")
                res.send(result)
                

            })
            .catch(err=>{
                console.log(err)
            })
        }
    
    });
})

router.post("/login" ,(req,res,next)=>{
    User.find({employeeName:req.body.employeeName})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                message:"user not found"
            })
        }
        
         bcrypt.compare(req.body.Password,user[0].Password,(err,result)=>{
            console.log(user)
            if(!result){
                console.log(result)
                return res.status(401).json({
                    message:"password matching failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    employeeID:user[0].employeeID,
                    employeeName:user[0].employeeName,
                    employeeRole:user[0].employeeRole 
                },
                "Sahil",
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    employeeID:user[0].employeeID,
                    employeeName:user[0].employeeName,
                    employeeRole:user[0].employeeRole,
                    token:token

                })
 
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get("/alldata" , checkAuth ,async (req, res)=>{

  const data=  await User.find({})
  console.log(data)
//   res.status(200).json(data);
res.send(data);

})

module.exports = router;


  
 



