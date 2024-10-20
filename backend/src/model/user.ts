import { Schema, model } from 'mongoose';

const User = new Schema({
  name: {
    type: String,
    required: [true, `please provide name`],
    minlength: 3,
    maxlength: 50,
  },
  aadhar: {
    type: String,
    unique: true,
    required: [true, `please provide addhar`],
  },
  age: {
    type: Number,
    required: [true, `please provide you age`]
  },
  contact: {
    type: Number,
    unique: true,
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
    ifsc: {
      type: String,
      required: [true, `please provide your ifsc code`],
    }
  },
  abhaNumber: {
    type: String,
    default: 0,
  },
  status: {
    health: {
      type: String,
      enum: ['active', 'clamed', 'none'],
      default: 'none',
    },
    fixed: {
      type: String,
      enum: ['active', 'clamed', 'none'],
      default: 'none',
    },
    provident: {
      type: String,
      enum: ['active', 'clamed', 'none'],
      default: 'none',
    }
  }
})

export default model('User', User);
//"privateKey": "ddD9AGtor3qtjEJ+XdgRrw==:JOHCm+6UDVcN4frsD9wYq0T9NqOjkDEBY+MVFGEpH5d+rUEoF8gyxP5IWy2C8873iG+UMeSxx7NJO3JUDErAyGSw215DiSyAMNwTocCFICo=",
// "address": "0x976EA74026E726554dB657fA54763abd0C3a0aa9"
