import { Document } from 'mongoose';

interface IUserDocument extends Document {
  email: string;
  password: string;
}

export default IUserDocument;