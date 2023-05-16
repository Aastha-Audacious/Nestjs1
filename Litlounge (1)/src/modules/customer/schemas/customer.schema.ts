import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export const CustomerSchema = new Schema({
  customerId: {
    type: String
  },
  givenName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
