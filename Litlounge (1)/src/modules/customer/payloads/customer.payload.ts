import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CustomerPayload {
  @ApiProperty()
  @IsString()
  givenName: string;

  @ApiProperty()
  @IsString()
  familyName: string;

  @ApiProperty()
  @IsString()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
