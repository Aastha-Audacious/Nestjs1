import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSubscriptionPayload } from '../payloads/create-subscription.payload';
import { UpdateSubscriptionPayload } from '../payloads/update-subscription.payload';
import { SubscriptionDto } from '../dtos/subscription.dto';
import { SubscriptionService } from '../services/subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() createSubscriptionPayload: CreateSubscriptionPayload): Promise<SubscriptionDto> {
    const subscription = await this.subscriptionService.create(createSubscriptionPayload);
    return new SubscriptionDto(subscription);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SubscriptionDto> {
    const subscription = await this.subscriptionService.findById(id);
    return new SubscriptionDto(subscription);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSubscriptionPayload: UpdateSubscriptionPayload): Promise<SubscriptionDto> {
    const subscription = await this.subscriptionService.update(id, updateSubscriptionPayload);
    return new SubscriptionDto(subscription);
  }
}
