export class SubscriptionPayload {
    locationId: string;
    planId: string;
    customerId: string;
    startDate: Date;
    priceMoney: {
      amount: number;
      currency: string;
    };
    billingAnchor?: Date;
    taxPercentage?: string;
    timezone?: string;
  }
  