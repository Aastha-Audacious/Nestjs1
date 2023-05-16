import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  SubscriptionService,
  SubscriptionPlan
} from '../services/subscription.service';
import { SubscriptionCreatePayload } from '../payloads/subscription-create.payload';
import { SubscriptionUpdatePayload } from '../payloads/subscription-update.payload';
import { SubscriptionModel } from '../models/subscription.models';
import { DataResponse } from 'src/kernel';
import { SubscriptionDto } from '../dtos/subscription.dtos';
import { Roles } from 'src/modules/auth/decorators';
import { RoleGuard } from 'src/modules/auth/guards';
import { SubscriptionPayload } from '../payloads/subscription.payload';
import { Client, Environment } from 'square';

@Injectable()
@Controller('subscription')
export class SubscriptionController {
  client: Client;

  constructor(private readonly subscriptionService: SubscriptionService) {
    this.client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox
    });
  }

  /*
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
  */


  @Post()
  async createSubs(
    @Body() payload: SubscriptionPayload,
  ): Promise<SubscriptionDto> {
    const subscription = await this.subscriptionService.createSubs(payload);
    return new SubscriptionDto(subscription);
  }

  @Get()
  async getAllSubscriptions(): Promise<SubscriptionDto[]> {
    const subscriptions = await this.subscriptionService.findAll();
    return subscriptions.map((subscription) => new SubscriptionDto(subscription));
  }

  // @Post('/create')
  // @HttpCode(HttpStatus.OK)
  // async create(
  //   @Body() payload: SubscriptionCreatePayload
  // ): Promise<DataResponse<SubscriptionDto>> {
  //   try {
  //     const subscription = await this.subscriptionService.create(payload);
  //     console.log(subscription);
  //     return DataResponse.ok(new SubscriptionDto(subscription));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
//   @Post()
//   async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
//     // Call the service method to create the subscription
//     const subscription = await this.subscriptionService.createSubscriptionPlan(createSubscriptionDto);
    
//     // Handle the response or return it to the client
//     return subscription;
//   }
// }

  @Post('plan')
  @HttpCode(HttpStatus.OK)
  async createSubscriptionPlan(@Body() payload: any): Promise<DataResponse<any>> {
    try {
          const subscription = await this.subscriptionService.createSubscriptionPlan();

      // const response = await this.client.catalogApi.upsertCatalogObject({
      //   idempotencyKey: 'af3d1afc-7212-4300-b463-0bfc5314a5ae',
      //   object: {
      //     type: 'ITEM',
      //     id: '#Cocoa',
      //     itemData: {
      //       name: 'Cocoa',
      //       description: 'Hot Chocolate',
      //       abbreviation: 'Ch',
      //       variations: [
      //         {
      //           type: 'ITEM_VARIATION',
      //           id: '#Small',
      //           itemVariationData: {
      //             itemId: '#Cocoa',
      //             name: 'Small',
      //             pricingType: 'VARIABLE_PRICING'
      //           }
      //         },
      //         {
      //           type: 'ITEM_VARIATION',
      //           id: '#Large',
      //           itemVariationData: {
      //             itemId: '#Cocoa',
      //             name: 'Large',
      //             pricingType: 'FIXED_PRICING',
      //             priceMoney: {
      //               amount: BigInt(400),
      //               currency: 'USD'
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   }
      // });

      return subscription;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create subscription plan');
    }
  }

  @Put('/update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() payload: SubscriptionUpdatePayload
  ): Promise<DataResponse<SubscriptionModel>> {
    try {
      const subscription = await this.subscriptionService.update(id, payload);
      return DataResponse.ok(subscription);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/search/:id')
  @HttpCode(HttpStatus.OK)
  async details(
    @Param('id') id: string
  ): Promise<DataResponse<SubscriptionModel>> {
    try {
      const subscription = await this.subscriptionService.findById(id);
      return DataResponse.ok(subscription);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<DataResponse<SubscriptionDto[]>> {
    try {
      const subscriptions = await this.subscriptionService.findAll();
      const subscriptionDtos = subscriptions.map(
        subscription => new SubscriptionDto(subscription)
      );
      return DataResponse.ok(subscriptionDtos);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DataResponse<boolean>> {
    try {
      const deleted = await this.subscriptionService.delete(id);
      return DataResponse.ok(deleted);
    } catch (error) {
      console.log(error);
    }
  }
}
