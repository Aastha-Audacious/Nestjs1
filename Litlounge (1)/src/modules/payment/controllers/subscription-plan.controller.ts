import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionPlanService } from '../services/subscription-plan.services';
import { CreateSubscriptionPlanDto } from '../dtos/subscription-plan.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionPlanService: SubscriptionPlanService) {}

  @Post('/create')
  async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionPlanDto) {
    const response = await this.subscriptionPlanService.createSubscription(createSubscriptionDto);
    console.log(response);
    return response;
  }
}
