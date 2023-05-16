import { Module } from '@nestjs/common';
import { SquareController } from './controllers/square.controller';
import { SquareService } from './services/square.service';

@Module({
  controllers: [SquareController],
  providers: [SquareService]
})
export class SquareModule {}
