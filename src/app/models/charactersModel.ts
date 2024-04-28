import mongoose, { Schema } from 'mongoose';
import { ICharacter } from '../../interfaces/character/ICharacter';

const characterSchema = new Schema<ICharacter>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    comic: {
      type: String
    },
    comicCount: {
      type: Number
    }
  },

  {
    timestamps: true,
  },
);

export default mongoose.model<ICharacter>('Character', characterSchema);
