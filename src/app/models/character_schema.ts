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
  },

  {
    timestamps: true,
  },
);

export default mongoose.model<ICharacter>('Character', characterSchema);
