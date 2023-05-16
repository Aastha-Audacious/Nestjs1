import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSubscriptionPlanDto } from '../dtos/subscription-plan.dto';
import { Client, Environment } from 'square';
import { SUBSCRIPTION_TRANSACTION_MODEL_PROVIDER } from '../providers';
import { SubscriptionPlanModel } from '../models/subscription-plan.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubscriptionPlanService {
  private client: Client;

  constructor(
    @Inject(SUBSCRIPTION_TRANSACTION_MODEL_PROVIDER)
    private readonly subscriptionPlanModel: Model<SubscriptionPlanModel>
  ) {
    this.client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox
    });
  }

  async createSubscription(
    createSubscriptionPlanDto: CreateSubscriptionPlanDto
  ): Promise<any> {
    const idempotencyKey = uuidv4();

    const {
      // idempotencyKey = uuidv4(),
      name,
      description,
      abbreviation,
      variations,
    } = createSubscriptionPlanDto;

    try {
      const response = await this.client.catalogApi.upsertCatalogObject({
        idempotencyKey,
        object: {
          type: 'ITEM',
          id: `#${name.replace(' ', '')}`,
          itemData: {
            name,
            description,
            abbreviation,
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

            // variations: variations.map(variation => ({
            //   type: 'ITEM_VARIATION',
            //   id: variation.id,
            //   itemVariationData: {
            //     itemId: `#${name.replace(' ', '')}`,
            //     name: variation?.name,
            //     pricingType: variation?.pricingType,
            //     priceMoney: variation?.priceMoney
            //   }
            // }))
          }
        }
      });
      console.log(response);
      const result = await this.createSubscription(createSubscriptionPlanDto);
      console.log(result);
      return result;

      //   const createdSubscription = new this.createSubscription(createSubscriptionPlanDto);
      //   return createdSubscription.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
