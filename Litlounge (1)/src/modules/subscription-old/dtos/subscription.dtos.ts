import { ObjectId } from 'mongodb';
import { pick } from 'lodash';

export interface SubscriptionPlanData {
  name: string;
  phases: {
    cadence: 'MONTHLY' | 'WEEKLY' | 'DAILY';
    periods?: number;
    recurringPriceMoney: {
      amount: number;
      currency: string;
    };
  }[];
}


export class SubscriptionDto {
  // _id: ObjectId;

  // name: string;

  // price: number;

  // currency: string;

  // interval: string;

  // intervalCount: number;

  // description: string;

  _id: string | ObjectId;
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


  constructor(data?: Partial<SubscriptionDto>) {
    data 
    && Object.assign(
      this,
      pick(data, [
        '_id',
        'locationId',
        'planId',
        'customerId',
        'startDate',
        'canceledDate',
        'billingAnchor',
        'priceMoney',
        'status',
        'taxPercentage',
        'timezone'
        
        // 'name',
        // 'price',
        // 'currency',
        // 'interval',
        // 'intervalCount',
        // 'description'
      ])
    );
  }
}

export class CreateSubscriptionDto {
  customerId: string;
  planId: string;
  startDate: Date;
  quantity: number;
  // Other subscription data properties
  billingAddress: string;
  shippingAddress: string;
  paymentMethodId: string;
  autoRenew: boolean;
  // ... add more properties as needed
  
  constructor(data?: Partial<CreateSubscriptionDto>) {
    Object.assign(this, data);
  }
}

