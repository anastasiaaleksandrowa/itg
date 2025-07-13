import express from 'express';
import Location from '../models/Location';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Получить все локации
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Создать локацию (только организатор)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user!.role !== 'organizer') return res.status(403).json({ message: "Only organizers can create locations" });
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;