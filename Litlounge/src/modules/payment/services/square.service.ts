import { Injectable } from '@nestjs/common';
import {
  ApiResponse,
  Client,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Environment
} from 'square';
import { v4 as uuidv4 } from 'uuid';

export interface SquareSinglePurchase {
  sourceId: string;
  price: number;
  currencyCode?: string;
  customerId?: string;
  verificationToken?: string;
}

@Injectable()
export class SquareService {
  client: Client;

  constructor() {
    this.client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox
    });
  }

  public async singlePurchase(
    payload: SquareSinglePurchase
  ): Promise<
    Pick<ApiResponse<CreatePaymentResponse>, 'result' | 'statusCode'>
  > {
    const idempotencyKey = uuidv4();

    const payment: CreatePaymentRequest = {
      idempotencyKey,
      locationId: process.env.SQUARE_LOCATION_ID,
      sourceId: payload.sourceId,
      amountMoney: {
        // the expected amount is in cents, meaning $1.00 should be pass as 100.
        // eslint-disable-next-line no-undef
        amount: BigInt(payload.price * 100),
        currency: payload.currencyCode || 'USD'
      }
    };
    console.log(payment, "payment");

    if (payload.customerId) {
      payment.customerId = payload.customerId;
    }

    // VerificationDetails is part of Secure Card Authentication.
    // This part of the payload is highly recommended (and required for some countries)
    // for 'unauthenticated' payment methods like Cards.
    if (payload.verificationToken) {
      payment.verificationToken = payload.verificationToken;
    }

    const { result, statusCode } = await this.client.paymentsApi.createPayment(
      payment
    );
    console.log(result);

    // eslint-disable-next-line no-console
    console.info('Payment succeeded!', { result, statusCode });

    return { result, statusCode };
  }
}
