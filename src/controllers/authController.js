const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await User.find({email});
        if(user) return res.status(400).send("User already exist try login");
        const hashedPs=await bcrypt.hash(password,process.env.SALT_ROUND || 10);
        const newUser=await User.create({name,email,password:hashedPs});
        
        jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        res.status(200).json({message:"User Created successfully"})
    }catch(err){
        console.log("Error in signup "+err.message);
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.find({email});
        if(!user) res.status(400).json({message:"Invalid Credentials"});
        const isRightPassword=await bcrypt.compare(password,user.password);
        if(!isRightPassword) throw new Error("Invalid credentials");

        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie('token',token);
        res.json({message:"Login Successfully",user})
    }catch(err){
        res.status(400).json({message:"Invalid credentials"});
    }
}

module.exports={signup,login}