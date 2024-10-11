import { request } from 'axios';
import { Schema, model } from 'mongoose';
import { type } from 'os';

const User = new Schema({
  name: {
    type: String,
    required: [true, `please provide name`],
    minlength: 3,
    maxlength: 50,
  },
  aadhar: {
    type: Number,
    unique: true,
    required: [true, `please provide addhar number`],
    match: [
      /^(\d{4}\s\d{4}\s\d{4})$/,
      `please provide correct aadhar`
    ],
  },
  age: {
    type: Number,
    required: [true, `please provide you number`]
  },
  wallet: {
    privateKey: {
      type: String,
    },
    address: {
      type: String,
    }
  },
  bankDetails: {
    bankName: {
      type: String,
      required: [true, `please provide bank name`]
    },
    accountNumber: {
      type: String,
      required: [true, `please provide accountNumber`]
    },
    Ifsc: {
      type: String,
      required: [true, `please provide your ifsc code`],
    }
  },
  abhaNumber: {
    type: Number,
    default: 0,
  },
})

export default model('User', User);
