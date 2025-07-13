import express from 'express';
import Comment from '../models/Comment';
import Event from '../models/Event';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Добавить комментарий к событию
router.post('/:eventId', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const comment = await Comment.create({
      user: req.user!.id,
      event: req.params.eventId,
      text: req.body.text
    });
    res.status(201).json(comment);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Получить комментарии к событию
router.get('/:eventId', async (req, res) => {
  try {
    const comments = await Comment.find({ event: req.params.eventId }).populate('user', 'name');
    res.json(comments);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;