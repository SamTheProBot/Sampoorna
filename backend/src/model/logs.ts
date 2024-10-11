import { Schema, model } from 'mongoose';

const Logs = new Schema({
  fromName: {
    type: String,
    default: '',
  },
  toName: {
    type: String,
    default: '',
  },
  eventType: {
    type: String,
    required: true,
    enum: ["donation", "fundrecive", "cancel_provident_fund", "provident_fund", "cancel_fixed_deposit", "fixed_deposit", "cancel_health_insurence", "health_insurence"],
  },
  from: {
    type: String,
    required: true,
  },
  transction_hash: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  }
});

export default model('Logs', Logs);
