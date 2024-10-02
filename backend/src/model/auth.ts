import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `please provide name`],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, `please provide email`],
    match: [
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      'please provide valid email',
    ],
  },
  password: {
    type: String,
    required: [true, `please provide password`],
  },
});

export default mongoose.model('UserSchema', UserSchema);
