import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import eventRoutes from './routes/event';
import participationRoutes from './routes/participation';
import commentRoutes from './routes/comment';
import locationRoutes from './routes/location';
import './styles/styles.css';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/participations', participationRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/locations', locationRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
.then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch(err => console.error(err));