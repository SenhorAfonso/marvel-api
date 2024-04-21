import mongoose, { Schema } from 'mongoose';
import { ICharacter } from '../../interfaces/character/ICharacter';

const characterSchema = new Schema<ICharacter>(
  {
    name: {
      type: String,
      required: [true, 'Character name is a required field!'],
    },
    description: {
      type: String,
      required: [true, 'Character description is a required field!'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Character thumbnail is a required field!'],
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model<ICharacter>('Character', characterSchema);
