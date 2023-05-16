import { Decimal128, Document } from 'mongoose';

export interface SubscriptionPlanModel extends Document {
  // idempotencyKey: string;
  name: string;
  description: string;
  abbreviation: string;
  variations: Variation[];
}

export interface Variation {
  id: string;
  name: string;
  pricingType: string;
  priceMoney?: PriceMoney;
}

export interface PriceMoney {
  amount: Decimal128;
  currency: string;
}

// export const SubscriptionModel = model<Subscription>('Subscription', SubscriptionSchema);
