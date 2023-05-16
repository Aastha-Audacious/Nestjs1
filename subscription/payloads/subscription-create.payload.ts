import {
  IsString,
  IsOptional,
  IsNumber
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionCreatePayload {
  @ApiProperty()
  @IsString()
  @IsOptional()
  subscriptionId: string | ObjectId;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  currency: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  interval: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  intervalCount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
