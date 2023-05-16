import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SubscriptionUpdatePayload {
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
