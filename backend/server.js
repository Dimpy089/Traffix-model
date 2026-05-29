const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/db');
const authRoutes = require('./routers/authRoutes');
const predictionRoutes =require('./routers/prediction') ;
const { loadCSV } = require("./utils/loadCsv");


const app=express();
app.use(express.json());

const PORT=8080;

app.get('/',(req,res)=>{
    res.send('Hello world!');
});


app.use('/api/auth',authRoutes);
app.use("/", predictionRoutes);




const startServer = async () => {
    await connectDB();
     await loadCSV();
    app.listen(PORT,()=>{
        console.log('Server is running on port '+PORT);
    });
};

startServer();