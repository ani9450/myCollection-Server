import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({'limit' : "30mb", extended : true}));
app.use(bodyParser.urlencoded({'limit' : "30mb", extended : true}));
app.use(cors());

app.use('/posts',postRoutes);

app.get('/', (req,res) =>{
    res.send('Hello to Collection API !!')
})
// mongodb cloud atlas.

// const CONNECTION_URL = "mongodb+srv://developer:developer@cluster0.oqgxo.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true })
    .then(()=>{ app.listen(PORT,()=> console.log(`sever running on port ${PORT}`))} )
    .catch(err =>{ console.log(err.message)});

mongoose.set('useFindAndModify',false);
