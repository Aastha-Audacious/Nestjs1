import { forwardRef, Module } from '@nestjs/common';
import { subscriptionSchema } from 'square/dist/types/models/subscription';
import { MongoDBModule, QueueModule } from 'src/kernel';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { SubscriptionController } from './controllers/subscription.controller';
import {subscriptionProviders} from './providers/index'
import { SubscriptionService } from './services/subscription.service';


@Module({
  imports:[
    MongoDBModule,
    // QueueModule.forRoot(),
    // forwardRef(() => UserModule),
    // forwardRef(() => AuthModule)
  ],
  controllers:[SubscriptionController],
  providers: [...subscriptionProviders, SubscriptionService],
  exports:[SubscriptionService]
})
export class SubscriptionModule {}
