import { pick } from 'lodash';
import { ObjectId } from 'mongodb';

export class CreateCustomerDto {
  _id: string | ObjectId;
  customerId: string;
  givenName: string;
  familyName: string;
  emailAddress: string;

  constructor(data?: Partial<CreateCustomerDto>) {
    data && Object.assign(this, pick(data, ['_id', 'customerId', 'givenName','familyName','emailAddress' ]));
  }
}
