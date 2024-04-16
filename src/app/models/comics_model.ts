import mongoose from 'mongoose';
import IComic_model from '../../interfaces/comic/IComic_model';

const comicSchema = new mongoose.Schema<IComic_model>({
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

export default mongoose.model<IComic_model>('comicModel', comicSchema);