import express from 'express';
import * as dotnev from 'dotenv';

import {v2 as cloudinary} from 'cloudinary';

import Post from '../models/post.js';

dotnev.config();


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})



const router = express.Router();
//get all posts

router.route('/').get(async(req,res)=>{
    try {
        const posts = await Post.find({});
        res.status(200).json({success:true,data:posts})

    } catch (error) {
        res.status(500).json({success:false,message:error}) 
        console.log(error);
    }
});

//create a route
router.route('/').post(async(req,res)=>{
    try {
        const {name,prompt,photo} = req.body;
        console.log(name,prompt,photo);
        const photoURL = await cloudinary.uploader.upload(photo);
        
        const newPost = await Post.create({
            name,
            prompt,
            photo:photoURL.url,
        });
        res.status(201).json({success:true,data:newPost})

    } catch (error) {
        res.status(500).json({success:false,messaage:error})
    }
});


export default router;