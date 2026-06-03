const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const path=require('path');
dotenv.config();
const connectDB=require('./config/db');
const authRoutes = require('./routers/authRoutes');
const predictionRoutes =require('./routers/prediction') ;
const { loadCSV } = require("./utils/loadCsv");


const app=express();
const frontendPath=path.join(__dirname,'..','frontend','dist');

app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

const PORT=8080;


app.use('/api/auth',authRoutes);
app.use("/", predictionRoutes);
app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(frontendPath,'index.html'));
});




const startServer = async () => {
    await connectDB();
     await loadCSV();
    app.listen(PORT,()=>{
        console.log('Server is running on port '+PORT);
    });
};

startServer();
