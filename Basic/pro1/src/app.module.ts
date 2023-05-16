import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
// import { ItemsController } from './items/items.controller';
// import { ItemsService } from './items/items.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ItemsModule } from './items/items.module'

import config from './config/keys'
@Module({
  imports: [ItemsModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
