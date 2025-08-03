const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT= require("jsonwebtoken");

//REGISTER
const registerController=async (req,res)=>{
    try{
        const {username,email,password}=req.body; 
        if(!username || !email || !password){
            return res.status(500).send({
                success:false,
                message:"All fields are required"
            })
        }
        //check existing user
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:"User already exists"
            })
        }
        const salt=await bcrypt.genSalt(10); //generate salt
        const hashedPassword=await bcrypt.hash(password,salt); //hash password

        //save user
        const newuser=new userModel({username,email,password:hashedPassword});
        await newuser.save();

        res.status(201).send({
            success:true,
            message:"User registered successfully",
            user:newuser
        })


    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Register API",
            error
        })
    }

}

//LOGIN
const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body;
    
        //find user
        const user=await userModel.findOne({email});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //password check
        // if(user.password !== password){
        //     return res.status(401).send({
        //         success:false,
        //         message:"Invalid credentials"
        //     })
        // }

        //match password
        const isMatch=await bcrypt.compare(password,user.password); //compare hashed password with entered password
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid credentials"
            })
        }
        //token
        const token=await JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"1d"
        }); //create token



        res.status(200).send({
            success:true,
            message:"User logged in successfully",
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
               
            }
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Login API error",
            error
        })
    }
}

module.exports={registerController,loginController};  //to write multiple functions,we add curly braces