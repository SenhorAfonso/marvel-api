import { Document } from 'mongoose';

export interface ICharacter extends Document {
  name: string;
  description: string;
  thumbnail: string;
}
