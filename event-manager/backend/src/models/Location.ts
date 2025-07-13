import mongoose,{Document} from 'mongoose';

export interface ILocation extends Document {
 name:string;
 address:string;
 description?:string;
}

const locationSchema = new mongoose.Schema<ILocation>({
 name:{type:String,required:true},
 address:{type:String,required:true},
 description:String,
});

export default mongoose.model<ILocation>('Location', locationSchema);
