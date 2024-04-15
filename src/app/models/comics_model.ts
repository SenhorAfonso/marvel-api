import mongoose from 'mongoose';
import IComic from '../../interfaces/IComic';

const comicSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Comic title is a required field!']
  },
  description: {
    type: String,
    require: [true, 'Comic description is a required field!']
  },
  publish_date: {
    type: String,
    require: [true, 'Comid publish_date is a required field!']
  },
  folder: {
    type: String,
    require: [true, 'Comic folder is a required field!']
  }
});

export default mongoose.model<IComic>('comicModel', comicSchema);