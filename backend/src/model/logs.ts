import { Schema, model } from 'mongoose';

const Logs = new Schema({
  eventType: {
    type: String,
    required: true,
    enum: ["donation", "payment", "fundrecive", "cancel_provident_fund", "provident_fund", "cancel_fixed_deposit", "fixed_deposit", "health_insurence"],
  },
  from: {
    type: String,
    required: true,
  },
  fromName: {
    type: String,
    default: '',
  },
  transaction_hash: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  toName: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  time: {
    type: Date,
    default: () => {
      const date = new Date();
      return `${date.toLocaleString()}`;
    }
  }
});

export default model('Logs', Logs);
