import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from '../models/subscription.model';
import { CreateSubscriptionPayload } from '../payloads/create-subscription.payload';
import { UpdateSubscriptionPayload } from '../payloads/update-subscription.payload';
import { SubscriptionNotFoundException } from '../exeptions/subscription-not-found.exception';
import { SubscriptionRepository } from '../providers/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  create(createSubscriptionPayload: CreateSubscriptionPayload): Subscription {
    const subscription: Subscription = {
      id: uuidv4(),
      name: createSubscriptionPayload.name,
      description: createSubscriptionPayload.description,
      // Assign more fields here
    };
    return this.subscriptionRepository.create(subscription);
  }

  findById(id: string): Subscription {
    const subscription = this.subscriptionRepository.findById(id);
    if (!subscription) {
      throw new SubscriptionNotFoundException(id);
    }
    return subscription;
  }

  update(id: string, updateSubscriptionPayload: UpdateSubscriptionPayload): Subscription {
    const subscription = this.findById(id);
    if (updateSubscriptionPayload.name) {
      subscription.name = updateSubscriptionPayload.name;
    }
    if (updateSubscriptionPayload.description) {
      subscription.description = updateSubscriptionPayload.description;
    }
    // Update more fields here
    return this.subscriptionRepository.update(subscription);
  }
}
