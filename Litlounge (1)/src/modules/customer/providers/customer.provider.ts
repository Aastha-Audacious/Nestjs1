import { Connection } from 'mongoose';
import { MONGO_DB_PROVIDER } from 'src/kernel';
import { CustomerSchema } from '../schemas/customer.schema';

export const CUSTOMER_MODEL_PROVIDER = 'CUSTOMER_MODEL_PROVIDER';

export const customerProviders = [
  {
    provide: CUSTOMER_MODEL_PROVIDER,
    useFactory: (connection: Connection) => connection.model('Customer', CustomerSchema),
    inject: [MONGO_DB_PROVIDER]
  }
];
