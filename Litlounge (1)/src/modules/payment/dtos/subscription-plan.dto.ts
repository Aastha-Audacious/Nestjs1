// create-subscription.dto.ts

// import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionPlanDto {
  // @ApiProperty()
  // idempotencyKey: string;

  // @ApiProperty()
  name: string;

  // @ApiProperty()
  description: string;

  // @ApiProperty()
  abbreviation: string;

  // @ApiProperty()
  variations: VariationDto[];
}
export class PriceMoneyDto {
  // @ApiProperty()
  amount: number;

  // @ApiProperty()
  currency: string;
}
export class VariationDto {
  // @ApiProperty()
  id: string;

  // @ApiProperty()
  name: string;

  // @ApiProperty()
  pricingType: string;

  // @ApiProperty({ required: false })
  priceMoney?: PriceMoneyDto;
}


