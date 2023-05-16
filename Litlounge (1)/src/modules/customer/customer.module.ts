import { Module } from '@nestjs/common';
import { MongoDBModule, QueueModule } from 'src/kernel';
import { CustomerController } from './controllers/customer.controller';
import { customerProviders } from './providers/customer.provider';
import { CustomerService } from './services/customer.service';

@Module({
  imports:[
    MongoDBModule,
    QueueModule.forRoot(),
  ],
  controllers: [CustomerController],
  providers: [...customerProviders,CustomerService]
})
export class CustomerModule {}
