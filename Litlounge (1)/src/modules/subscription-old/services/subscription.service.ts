import {
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Param,
  Put
} from '@nestjs/common';
import {
  ApiResponse,
  Client,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Environment
} from 'square';

import { Model } from 'mongoose';
import { SubscriptionPlanData } from '../interface/subscription.interface';
import { SubscriptionModel } from '../models/subscription.models';
import { SUBSCRIPTION_MODEL_PROVIDER } from '../providers';
import { SubscriptionCreatePayload } from '../payloads/subscription-create.payload';
import { SubscriptionPayload } from '../payloads/subscription.payload';
import { SubscriptionUpdatePayload } from '../payloads/subscription-update.payload';
import { DataResponse } from 'src/kernel';
import { SubscriptionDto } from '../dtos/subscription.dtos';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

export interface SubscriptionPlan {
  subscriptionId: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  intervalCount: number;
  description?: string;
}

export interface Subscription {
  subscriptionId: string;
  customerId: string;
  subscriptionPlan: SubscriptionPlan;
  startDate: Date;
  endDate: Date;
}

@Injectable()
export class SubscriptionService {
  client: Client;

  constructor(
    @Inject(SUBSCRIPTION_MODEL_PROVIDER)
    private readonly subscriptionModel: Model<SubscriptionModel>
  ) {
    this.client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox
    });
  }
  // private readonly subscriptionPlans: SubscriptionPlan[] = [
  //   {
  //     subscriptionId: '1',
  //     name: 'plan one',
  //     price: 12,
  //     currency: 'USD',
  //     interval: 'month',
  //     intervalCount: 1,
  //     description: 'This is first plan'
  //   },
  //   {
  //     subscriptionId: '2',
  //     name: 'plan two',
  //     price: 123,
  //     currency: 'USD',
  //     interval: 'year',
  //     intervalCount: 1,
  //     description: 'This is second plan'
  //   }
  // ];
  async createSubscriptionPlan(): Promise<any> {
    try {
      const idempotencyKey = uuidv4();

      const response = await this.client.catalogApi.upsertCatalogObject({
        idempotencyKey,
        object: {
          type: 'ITEM',
          id: '#Cocoa',
          itemData: {
            name: 'Cocoa',
            description: 'Hot Chocolate',
            abbreviation: 'Ch',
            variations: [
              {
                type: 'ITEM_VARIATION',
                id: '#Small',
                itemVariationData: {
                  itemId: '#Cocoa',
                  name: 'Small',
                  pricingType: 'VARIABLE_PRICING'
                }
              },
              {
                type: 'ITEM_VARIATION',
                id: '#Large',
                itemVariationData: {
                  itemId: '#Cocoa',
                  name: 'Large',
                  pricingType: 'FIXED_PRICING',
                  priceMoney: {
                    amount: BigInt(400),
                    currency: 'USD'
                  }
                }
              }
            ]
          }
        }
      });

      console.log(response.result)
      return response.result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create subscription plan');
    }
  }

  public async findById(id: string | ObjectId): Promise<SubscriptionModel> {
    const query = { _id: id };
    const subscription = await this.subscriptionModel.findOne(query);
    if (!subscription) return null;
    return subscription;
  }

  public async findAll(): Promise<SubscriptionModel[]> {
    const subscriptions = await this.subscriptionModel.find({});
    return subscriptions;
  }
  async createSubs(payload: SubscriptionPayload): Promise<SubscriptionModel> {
    const subscription = new this.subscriptionModel(payload);
    return subscription.save();
  }

  async create(payload: SubscriptionCreatePayload): Promise<SubscriptionModel> {
    const idempotencyKey = uuidv4();

    const data = {
      idempotencyKey,
      ...payload,
      updatedAt: new Date(),
      createdAt: new Date()
    } as any;
    console.log(idempotencyKey);
    const subscription = await this.subscriptionModel.create(data);

    console.log('create');
    return subscription;
  }

  public async update(
    id: string | ObjectId,
    payload: SubscriptionUpdatePayload
  ): Promise<SubscriptionModel> {
    const subscription = await this.findById(id);
    console.log(subscription, 'old data');
    if (!subscription) {
      throw new NotFoundException();
    }

    const data = {
      ...payload,
      updatedAt: new Date()
    } as any;
    console.log(data, 'new data');
    await subscription.save();
    console.log(data, 'new data after save');
    return data;
  }

  public async delete(
    id: string | ObjectId | SubscriptionModel
  ): Promise<boolean> {
    const menu =
      id instanceof this.subscriptionModel ? id : await this.findById(id);
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    await this.subscriptionModel.deleteOne({ _id: id });
    return true;
  }
  // -----------------------------------------------------------------------------

  // async upsertSubscriptionPlan(
  //   subscriptionPlan: SubscriptionPlan
  // ): Promise<SubscriptionPlan> {
  //   const existingPlan = this.subscriptionPlans.find(
  //     plan => plan.subscriptionId === subscriptionPlan.subscriptionId
  //   );

  //   if (existingPlan) {
  //     Object.assign(existingPlan, subscriptionPlan);
  //     return existingPlan;
  //   } else {
  //     this.subscriptionPlans.push(subscriptionPlan);
  //     console.log(subscriptionPlan, 'subscriptionplan');
  //     return subscriptionPlan;
  //   }
  // }

  // findAll(): SubscriptionPlan[] {
  //   return this.subscriptionPlans;
  // }

  // findOne(id: string): SubscriptionPlan {
  //   return this.subscriptionPlans.find(plan => plan.subscriptionId === id);
  // }

  // delete(id: string): SubscriptionPlan{
  //   return this.subscriptionPlans.findByIdAndDelete(id);
  // }
}
