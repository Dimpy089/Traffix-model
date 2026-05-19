const crypto = require('crypto');
global.crypto = crypto;
// crypto is not defined - MongoDB driver can't access the Node.js crypto module needed for SCRAM authentication.

const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_STRING);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports=connectDB;