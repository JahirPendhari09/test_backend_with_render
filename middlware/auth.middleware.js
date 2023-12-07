const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

const auth= async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        const isBlacked= await BlackListModel.findOne({token});
        if(isBlacked){
            res.status(200).send({"msg":"This is Token is Expired please Login"});
        }else{
            jwt.verify(token, 'masai', (err, decoded)=> {
                if(decoded)
                {
                    req.body.name= decoded.name;
                    req.body.userID = decoded.userID;
                    next()
                }else{
                    res.status(200).send({"error":err});
                }
            });
        }
    }else{
        res.status(400).send({"error":"Token not found please Login"})
    }
}

module.exports={auth}