import { Injectable } from '@nestjs/common';
import { Subscription } from '../models/subscription.model';

@Injectable()
export class SubscriptionRepository {
  private subscriptions: Subscription[] = [];

  create(subscription: Subscription): Subscription {
    this.subscriptions.push(subscription);
    return subscription;
  }

  findById(id: string): Subscription {
    return this.subscriptions.find(subscription => subscription.id === id);
  }

  update(subscription: Subscription): Subscription {
    const index = this.subscriptions.findIndex(sub => sub.id === subscription.id);
    if (index !== -1) {
      this.subscriptions[index] = subscription;
    }
    return subscription;
  }
}
