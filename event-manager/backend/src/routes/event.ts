import express from 'express';
import Event from '../models/Event';
import Participation from '../models/Participation';
import Comment from '../models/Comment';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Список всех событий (предстоящих)
router.get('/', async (req,res)=>{
 try{
   const now=new Date();
   const events=await Event.find({dateTime:{ $gte : now }}).populate('location').populate('organizer','name');
   res.json(events);
 }catch(e){res.status(500).json({message:"Server error"});}
});

// Создать событие (только организатор)
router.post('/', authMiddleware, async (req,res)=>{
 try{
   if(req.user!.role!=='organizer') return res.status(403).json({message:"Only organizers can create events"});
   const event=await Event.create({...req.body,organizer:req.user!.id});
   // Организатор автоматически участвует:
   await Participation.create({
       user:req.user!.id,
       event:event._id,
       status:'confirmed'
   });
   res.status(201).json(event);
 }catch(e){res.status(500).json({message:"Server error"});}
});

// Получить событие по id + список участников + комментарии:
router.get('/:id', async (req,res)=>{
 try{
   const event=await Event.findById(req.params.id)
      .populate('location')
      .populate('organizer','name');
   if(!event) return res.status(404).json({message:"Not found"});

   // Участники:
   const participants=await Participation.find({
      event:event._id,status:'confirmed'
   }).populate('user','name');

   // Комментарии:
   const comments=await Comment.find({
      event:event._id,
   }).populate('user','name');

   res.json({
      ...event.toObject(),
      participants,
      comments,
   });
 }catch(e){res.status(500).json({message:"Server error"});}
});

export default router;