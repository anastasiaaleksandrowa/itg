import mongoose, { Document } from 'mongoose';

export interface IParticipation extends Document {
 user : mongoose.Types.ObjectId;
 event : mongoose.Types.ObjectId;
 status : 'confirmed' | 'cancelled';
}

const participationSchema = new mongoose.Schema<IParticipation>({
 user:{type : mongoose.Schema.Types.ObjectId , ref:'User' , required:true},
 event:{type : mongoose.Schema.Types.ObjectId , ref:'Event' , required:true},
 status:{type:String , enum:['confirmed','cancelled'] , default:'confirmed'}
});

export default mongoose.model<IParticipation>('Participation', participationSchema);