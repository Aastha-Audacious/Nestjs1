import { Body, Controller, Post } from '@nestjs/common';
import { CustomerPayload } from '../payloads/customer.payload';
import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() payload: CustomerPayload) {
    try {
      const result = await this.customerService.create(payload);
      return result;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}
