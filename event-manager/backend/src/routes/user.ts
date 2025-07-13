import express from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Participation from '../models/Participation';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/me', authMiddleware, async (req,res)=>{
 try{
     const user = await User.findById(req.user!.id).select('-password');
     res.json(user);
 }catch(e){
     res.status(500).json({message:"Server error"});
 }
});

// История мероприятий пользователя:
router.get('/me/events', authMiddleware, async (req,res)=>{
 try{
     // как организатор:
     const organizedEvents = await Event.find({organizer:req.user!.id});
     
     // как участник:
     const participations = await Participation.find({user:req.user!.id,status:'confirmed'}).populate('event');
     
     res.json({
         organizedEvents,
         participatedEvents : participations.map(p=>p.event)
     });
 }catch(e){
     res.status(500).json({message:"Server error"});
 }
});

export default router;