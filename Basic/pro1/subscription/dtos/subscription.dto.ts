import { Subscription } from '../models/subscription.model';

export class SubscriptionDto {
  constructor(subscription: Subscription) {
    this.id = subscription.id;
    this.name = subscription.name;
    this.description = subscription.description;
    // Map more fields here
  }

  id: string;
  name: string;
  description: string;
  // Add more fields here
}
