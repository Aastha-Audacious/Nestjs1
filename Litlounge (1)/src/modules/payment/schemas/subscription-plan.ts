import { Schema } from 'mongoose';

export const SubscriptionPlanSchema = new Schema({
  // idempotencyKey: String,
  name: String,
  description: String,
  abbreviation: String,
  variations: [
    {
      id: String,
      name: String,
      pricingType: String,
      priceMoney: {
        amount: Schema.Types.Decimal128,
        currency: String
      }
    }
  ]
});
