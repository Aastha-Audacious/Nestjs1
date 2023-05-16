import { Module } from '@nestjs/common';
import { mongoDBProviders } from './mongodb.provider';

@Module({
  providers: [...mongoDBProviders],
  exports: [...mongoDBProviders]
})
export class MongoDBModule {
  static forFeature(arg0: { name: string; schema: import("@apimatic/schema").Schema<import("square").Subscription, any>; }[]): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
}
