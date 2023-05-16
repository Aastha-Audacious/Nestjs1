import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export class SubscriptionModel extends Document {
  subscriptionId: ObjectId;

  name?: string;

  price?: number;

  currency?: string;

  interval?: string;

  intervalCount?: number;

  description: string;
}
