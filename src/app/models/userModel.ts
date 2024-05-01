import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import ILoginUserPayload from '../../interfaces/user/ILoginUserPayload';
import serverConfig from '../../configs/serverConfig';

const MIN_NAME_LENGTH: number = 5;

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    min: [MIN_NAME_LENGTH, `Name must be more than ${MIN_NAME_LENGTH} characters!`],
    require: [true, 'Name is a required field!']
  },
  email: {
    type: String,
    require: [true, 'Email is a required field!'],
    unique: [true, 'Email is already registered!']
  },
  password: {
    type: String,
    require: [true, 'Password is a required field!']
  }

});

userSchema.pre('save', async function hash() {
  const salt: string = serverConfig.BCRYPT_SALT!;
  this.password = await bcrypt.hash(this.password!, salt);
});

export default mongoose.model<ILoginUserPayload>('userModel', userSchema);