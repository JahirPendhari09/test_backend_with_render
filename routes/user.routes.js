const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

const userRoute = express.Router();

userRoute.post("/register",async(req,res)=>{
    const {email,password,age,name,city,is_married}= req.body;
    console.log(req.body)
    try{
        const user = await UserModel.findOne({email});
        if(user)
        {
            res.status(200).send({"msg":"This email address is already used please login"})
        }else{
            bcrypt.hash(password, 3, async(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    res.status(200).send({"msg":err})
                }else{
                    const new_User = new UserModel({
                        email,
                        name,
                        age,
                        is_married,
                        city,
                        password:hash
                    })
                    await new_User.save();
                    res.status(200).send({"msg":"The new User has been added","new_User":req.body})
                }
            });
        }

    }catch(err){
        res.status(400).send({"msg":err})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}= req.body;

    try{
        const user = await UserModel.findOne({email});
        if(user)
        {

            const token = jwt.sign({name:user.name, userID:user._id},"masai")
            bcrypt.compare(password, user.password, (err, result)=> {
                // result == true
                if(result)
                {
                    res.status(200).send({"msg":"Login uccessful","token":token})
                }else{
                    res.status(200).send({"msg":"Incorrect Password"})
                }
            });
        }else{
            res.status(200).send({"msg":"Email is not Found please put correct email"})
        }

    }catch(err){
        res.status(400).send({"msg":err})
    }
})


userRoute.get("/logout",async(req,res)=>{

    const token=req.headers.authorization?.split(" ")[1];
    try{
        const newToken = new BlackListModel({
            token:token
        })
        await newToken.save();
        res.status(200).send({"msg":"Logout Successfuly done"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports={userRoute}