import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
    orderNumber: {
      type: String
    },
    // buyer ID
    buyerId: {
      type: Schema.Types.ObjectId,
      index: true
    }

  // Add more fields here
}
);
// export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
