import { ObjectID } from 'mongodb';
import { Schema } from 'mongoose';

export const SubscriptionSchema = new Schema({
  locationId: {
    type: String,
    required: true
  },
  planId: {
    type: String,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  priceMoney: {
    amount: Number,
    currency: String
  },
  status: {
    type: String
  },

  // name: {
  //   type: String,
  //   required: true
  // },
  // price: {
  //   type: Number,
  //   required: true
  // },
  // currency: {
  //   type: String,
  //   required: true
  // },
  // interval: {
  //   type: String,
  //   enum: ['month', 'year'],
  //   required: true
  // },
  // intervalCount: {
  //   type: Number,
  //   required: true
  // },
  // description: {
  //   type: String
  // },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
