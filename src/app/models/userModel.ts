import mongoose from 'mongoose';

const MIN_NAME_LENGTH: number = 5;

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    min: [MIN_NAME_LENGTH, `Name must be more than ${MIN_NAME_LENGTH} characters!`],
    require: [true, 'Name is a required field!']
  },
  email: {
    type: String,
    require: [true, 'Email is a required field!']
  },
  password: {
    type: String,
    require: [true, 'Password is a required field!']
  }

});

export default mongoose.model('userModel', userSchema);