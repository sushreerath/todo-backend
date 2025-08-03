const express=require('express');
const morgan=require('morgan');
const dotenv=require('dotenv');
const colors=require('colors');
const cors=require('cors');
const connectDb = require('./config/db');

//env
dotenv.config();


//database
connectDb();


//rest object
const app=express();

//middlewares
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/v1/user',require('./routes/userRoute'));
app.use('/api/v1/test',require('./routes/testRouter'));
app.use('/api/v1/todo',require('./routes/todoRoute'));


//port
const PORT=process.env.PORT || 8000;
app.get('/', (req, res) => {
  res.send('API is running...');
});

//listen
app.listen(PORT,()=>{
    console.log(`Node server running on:${process.env.DEV_MODE} mode on port no: ${PORT}`.bgCyan);
})