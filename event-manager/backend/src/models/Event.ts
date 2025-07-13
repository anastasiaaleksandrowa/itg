import mongoose, { Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description?: string;
  dateTime: Date;
  location: mongoose.Types.ObjectId;
  organizer: mongoose.Types.ObjectId;
}

const eventSchema = new mongoose.Schema<IEvent>({
  title: { type: String, required: true },
  description: String,
  dateTime: { type: Date, required:true },
  location:{type:mongoose.Schema.Types.ObjectId,ref:'Location',required:true},
  organizer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
});

export default mongoose.model<IEvent>('Event', eventSchema);