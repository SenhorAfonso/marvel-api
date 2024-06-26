import mongoose from 'mongoose';
import IComicModel from '../../interfaces/comic/IComicModel';

const comicSchema = new mongoose.Schema<IComicModel>({
  title: {
    type: String,
    require: [true, 'Comic title is a required field!']
  },
  description: {
    type: String,
    require: [true, 'Comic description is a required field!']
  },
  publishDate: {
    type: String,
    require: [true, 'Comid publish_date is a required field!']
  },
  pageCount: {
    type: Number
  },
  folder: {
    type: String,
    require: [true, 'Comic folder is a required field!']
  }
});

export default mongoose.model<IComicModel>('comicModel', comicSchema);