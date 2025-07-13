import mongoose,{Document} from 'mongoose';

export interface IComment extends Document {
 user : mongoose.Types.ObjectId;
 event : mongoose.Types.ObjectId;
 text : string;
 date : Date;
}

const commentSchema = new mongoose.Schema<IComment>({
 user:{type : mongoose.Schema.Types.ObjectId , ref:'User' , required:true},
 event:{type : mongoose.Schema.Types.ObjectId , ref:'Event' , required:true},
 text:{type:String , required:true},
 date:{type : Date , default : Date.now}
});

export default mongoose.model<IComment>('Comment', commentSchema);