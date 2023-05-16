import { Schema } from 'mongoose';

export const SubscriptionSchema = new Schema({
  subscriptionId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    interval: {
      type: String,
      enum: ['month', 'year'],
      required: true
    },
    intervalCount: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
