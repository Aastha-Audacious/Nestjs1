import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  SubscriptionService,
  SubscriptionPlan
} from '../services/subscription.service';
import { SubscriptionPlanData } from '../interface/subscription.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  findAll(): SubscriptionPlan[] {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): SubscriptionPlan {
    return this.subscriptionService.findOne(id);
  }

  @Post('/create')
  async upsertSubscriptionPlan(@Body() subscriptionPlan: SubscriptionPlan) {
    return this.subscriptionService.upsertSubscriptionPlan(subscriptionPlan);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id): string {
    return `Deleted ${id}`;
  }
}
