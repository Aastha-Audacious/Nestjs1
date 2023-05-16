import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export class CustomerModel extends Document{
    _id: ObjectId;
    customerId: ObjectId;
    givenName: string;
    familyName: string;
    emailAddress: string
}