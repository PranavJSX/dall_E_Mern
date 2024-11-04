import express, { Router } from 'express';
import * as dotnev from 'dotenv';
import fetch from "node-fetch";

import { OpenAI} from 'openai'

dotnev.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
})


console.log(process.env.OPENAI_API_KEY);



router.route('/').get((req,res)=>{
    res.send('Hello from DALLE')
});

router.route('/').post(async(req,res)=>{

    try{
        const {prompt} = req.body;
        const url = `https://image.pollinations.ai/prompt/${prompt}`;
        const AI_response = await fetch(url,{
            method:'GET',
            width: 800,
            height: 600,
        });
        console.log(AI_response.url);
        res.status(200).json({url:AI_response.url});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

export default router;