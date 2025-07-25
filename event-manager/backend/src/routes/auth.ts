import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req,res)=>{
 try{
     const {name,email,password} = req.body;
     const existingUser = await User.findOne({email});
     if(existingUser) return res.status(400).json({message:"Email already exists"});
     const hash = await bcrypt.hash(password,10);
     const user = await User.create({name,email,password:hash});
     res.status(201).json({message:"Registered"});
 }catch(e){
     res.status(500).json({message:"Server error"});
 }
});

router.post('/login', async (req,res)=>{
 try{
     const {email,password} = req.body;
     const user = await User.findOne({email});
     if(!user) return res.status(400).json({message:"Invalid credentials"});
     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch) return res.status(400).json({message:"Invalid credentials"});
     const token = jwt.sign(
         {id:user._id,name:user.name,email:user.email,role:user.role},
         process.env.JWT_SECRET!,
         {expiresIn:'7d'}
     );
     res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}});
 }catch(e){
     res.status(500).json({message:"Server error"});
 }
});

export default router;