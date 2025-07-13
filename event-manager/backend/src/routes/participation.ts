import express from 'express';
import Participation from '../models/Participation';
import Event from '../models/Event';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Участвовать в событии
router.post('/:eventId', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Проверка: уже участвует?
    const exists = await Participation.findOne({
      user: req.user!.id,
      event: req.params.eventId,
      status: 'confirmed'
    });
    if (exists) return res.status(400).json({ message: "Already participating" });

    const participation = await Participation.create({
      user: req.user!.id,
      event: req.params.eventId,
      status: 'confirmed'
    });
    res.status(201).json(participation);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Отменить участие
router.delete('/:eventId', authMiddleware, async (req, res) => {
  try {
    const participation = await Participation.findOneAndUpdate(
      { user: req.user!.id, event: req.params.eventId, status: 'confirmed' },
      { status: 'cancelled' }
    );
    if (!participation) return res.status(404).json({ message: "Participation not found" });
    res.json({ message: "Participation cancelled" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;