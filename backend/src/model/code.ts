import { Schema, model } from 'mongoose';

const Verification = new Schema({
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  }
})

export default model('Verification', Verification);
