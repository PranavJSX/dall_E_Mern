import express from 'express';
import * as dotnev from 'dotenv';

import {v2 as cloudinary} from 'cloudinary';

import post from '../models/post.js';

dotnev.config();

const router = express.Router();

export default router;