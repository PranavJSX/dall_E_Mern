import express from 'express';
import * as dotnev from 'dotenv';

import { OpenAI} from 'openai'

dotnev.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
})


router.route('/').get((req,res)=>{
    res.send('Hello from DALLE')
});

export default router;