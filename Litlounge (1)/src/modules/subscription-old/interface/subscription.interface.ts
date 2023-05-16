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

export interface CatalogObject {
  type: 'SUBSCRIPTION_PLAN';
  id: string;
  subscriptionPlanData: SubscriptionPlanData;
}

export interface UpsertCatalogObjectRequest {
  idempotencyKey: string;
  object: CatalogObject;
}
