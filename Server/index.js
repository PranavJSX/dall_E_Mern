import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './MongoDb/Connect.js';
import postRoutes from '../Server/MongoDb/Routes/postRoutes.js';
import dalleRoutes from '../Server/MongoDb/Routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)


app.get('/',async(req,res)=>{
    res.send('Hello from DALL-E');

});


const startServer = async () =>{

    try {
        connectDB(process.env.MONGODB_URL)
    

    app.listen(5050, ()=>console.log('server has started on port 5050   '))
} catch (error) {
    console.log(error);       
}
}


startServer();
