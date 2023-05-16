import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export class SubscriptionModel extends Document {
  // subscriptionId: ObjectId;

  id: string;
  locationId: string;
  planId: string;
  customerId: string;
  startDate: Date;
  canceledDate?: Date;
  billingAnchor?: Date;
  priceMoney: {
    amount: number;
    currency: string;
  };
  status: string;
  taxPercentage?: string;
  timezone?: string;

  // name: string;

  // price: number;

  // currency: string;

  // interval: string;

  // intervalCount: number;

  // description: string;
}
