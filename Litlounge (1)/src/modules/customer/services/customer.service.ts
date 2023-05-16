import { Inject, Injectable } from '@nestjs/common';
import {
  ApiResponse,
  Client,
  CreateCustomerRequest,
  CreateCustomerResponse,
  Environment
} from 'square';
import { CustomerModel } from '../models/customer.model';
import { v4 as uuidv4 } from 'uuid';
import { CustomerPayload } from '../payloads/customer.payload';
import { Model } from 'mongoose';
import { CUSTOMER_MODEL_PROVIDER } from '../providers/customer.provider';
// import {UserService} from 'src/modules/user/services/user.service'

@Injectable()
export class CustomerService {
  client: Client;

  constructor(
    @Inject(CUSTOMER_MODEL_PROVIDER)
    private readonly customerModel: Model<CustomerModel>
    // private readonly userService: UserService
  ) {
    this.client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox
    });
  }

  async create(
    payload: CustomerPayload
  ): Promise<ApiResponse<CreateCustomerResponse>> {
    const idempotencyKey = uuidv4();

    const data = {
      idempotencyKey,
      ...payload,
      updatedAt: new Date(),
      createdAt: new Date()
    } as any;

    const result = await this.client.customersApi.createCustomer(data);
    // await this.userService.addCustomer(payload.userId, result.result.customer.id);

    const customerId = result.result.customer.id;
    console.log(customerId);
    const customer = new this.customerModel({
      customerId,
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await customer.save();

    return result;
  }

  // public async createCustomer(
  //   givenName: string,
  //   familyName: string,
  //   emailAddress: string
  // ): Promise<any> {
  //   const idempotencyKey = uuidv4();
  //   console.log(idempotencyKey);
  //   const customer: CreateCustomerRequest = {
  //     idempotencyKey,
  //     givenName,
  //     familyName,
  //     emailAddress
  //   };

  //   console.log(customer);

  // try {
  //     const response = await this.client.customersApi.listCustomers();

  //     console.log(response.result);
  //   } catch(error) {
  //     console.log(error);
  //   }

  // const response = await this.client.customersApi.createCustomer({
  //   idempotencyKey: 'c6a70aa1-8f1d-4bfe-8bee-d509d14d803c',
  //   givenName: 'naman',
  //   familyName: 'panwar',
  //   emailAddress: 'naman@gmail.com',
  //   note: 'Indore'
  // });

  // console.log(response.result);
  // } catch (error) {
  //   console.log(error);
  // }
}
