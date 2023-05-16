import { NotFoundException } from '@nestjs/common';

export class SubscriptionNotFoundException extends NotFoundException {
  constructor(subscriptionId: string) {
    super(`Subscription with ID "${subscriptionId}" not found`);
  }
}
