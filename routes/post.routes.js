const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BlaackListModel } = require("../model/blacklist.model");
const { PostModel } = require("../model/post.model");
const { auth } = require("../middlware/auth.middleware");

const postRoute = express.Router();

postRoute.use(auth)


postRoute.get("/",async(req,res)=>{
    // console.log(req.body)
    const {name}= req.body;
    console.log(name)
    try{
        const posts = await PostModel.find({name});
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({"error":err})
    }
})


postRoute.post("/add",async(req,res)=>{
    // const{title,body,device,nof_of_comments}=req.body
    // console.log(req.body)
    try{
        const newPost = new PostModel(req.body);
        await newPost.save();
        res.status(200).send({"msg":"new Post has been added","newPost":req.body})
    }catch(err){
        res.status(400).send({"error":err})
    }
})


postRoute.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params
  
    try{
        const post = await PostModel.findOne({_id:postID})

        if(req.body.userID === post.userID)
        {
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`The Post ${postID} has been updated`})
        }else{
            res.status(200).send({"msg":"You are not Authorized"})
        }
       
    }catch(err){
        res.status(400).send({"error":err})
    }
})



postRoute.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params

    try{
        const post = await PostModel.findOne({_id:postID})

        if(req.body.userID === post.userID)
        {
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":`The Post ${postID} has been Deleted`})
        }else{
            res.status(200).send({"msg":"You are not Authorized"})
        }
       
    }catch(err){
        res.status(400).send({"error":err})
    }
})


module.exports={postRoute}