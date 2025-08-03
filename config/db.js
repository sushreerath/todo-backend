const mongoose= require('mongoose');
const colors = require('colors');

const connectDb=async()=>{

    try {
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodb ${mongoose.connection.host}`.bgGreen.white);
        
    } catch (error) {
        console.error(`Database connection failed ${error}`.bgRed.white);
         // Exit the process with failure
    }
};
module.exports=connectDb;