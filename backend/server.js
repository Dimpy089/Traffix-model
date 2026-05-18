const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/db');
const app=express();
app.use(express.json());
connectDB();
const PORT=8080;

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.listen(PORT,()=>{
    console.log('Server is running on port'+PORT);
});