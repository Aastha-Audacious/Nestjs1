import { forwardRef, Module } from '@nestjs/common';
import { MongoDBModule, QueueModule } from 'src/kernel';
import { SubscriptionController } from './controllers/subscription.controller';
import {subscriptionProviders} from './providers/subscription.provider'
import { SubscriptionService } from './services/subscription.service';


@Module({
  imports:[
    MongoDBModule,
    QueueModule.forRoot(),
  ],
  controllers:[SubscriptionController],
  providers: [...subscriptionProviders, SubscriptionService],
  exports:[SubscriptionService]
})
export class SubscriptionModule {}
