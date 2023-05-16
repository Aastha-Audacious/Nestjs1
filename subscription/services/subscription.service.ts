import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SubscriptionPlanData } from '../interface/subscription.interface';
import { SubscriptionModel } from '../models/user.models';
import { SUBSCRIPTION_MODEL_PROVIDER } from '../providers';
import { SubscriptionCreatePayload } from '../payloads/subscription-create.payload';

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
  constructor(
    @Inject(SUBSCRIPTION_MODEL_PROVIDER)
    private readonly subscriptionModel: Model<SubscriptionModel>
  ) {}
  private readonly subscriptionPlans: SubscriptionPlan[] = [
    {
      subscriptionId: '1',
      name: 'plan one',
      price: 12,
      currency: 'USD',
      interval: 'month',
      intervalCount: 1,
      description: 'This is first plan'
    },
    {
      subscriptionId: '2',
      name: 'plan two',
      price: 123,
      currency: 'USD',
      interval: 'year',
      intervalCount: 1,
      description: 'This is second plan'
    }
  ];
  private readonly subscriptionPlanData: SubscriptionPlanData;

  async create(payload: SubscriptionCreatePayload): Promise<SubscriptionModel> {
    const data = {
      ...payload,
      updatedAt: new Date(),
      createdAt: new Date()
    };
    const subscription = await this.subscriptionModel.create(data);
    console.log("create");
    return subscription;
  }

  async upsertSubscriptionPlan(
    subscriptionPlan: SubscriptionPlan
  ): Promise<SubscriptionPlan> {
    const existingPlan = this.subscriptionPlans.find(
      plan => plan.subscriptionId === subscriptionPlan.subscriptionId
    );

    if (existingPlan) {
      Object.assign(existingPlan, subscriptionPlan);
      return existingPlan;
    } else {
      this.subscriptionPlans.push(subscriptionPlan);
      console.log(subscriptionPlan, "subscriptionplan");
      return subscriptionPlan;
    }
  }

  findAll(): SubscriptionPlan[] {
    return this.subscriptionPlans;
  }

  findOne(id: string): SubscriptionPlan {
    return this.subscriptionPlans.find(plan => plan.subscriptionId === id);
  }

  // delete(id: string): SubscriptionPlan{
  //   return this.subscriptionPlans.findByIdAndDelete(id);
  // }
}
