import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
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
    accountType: {
      type: String,
      required: [true, `please provide account type`],
      enum: ['saving', 'current', 'jan-dhan']
    }
  },
  abhaNumber: {
    type: Number,
    default: 0,
  },
})

export default model('UserSchema', UserSchema);
