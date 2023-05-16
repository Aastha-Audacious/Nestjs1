import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>){}

  async findAll():Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item>  {
    return await this.itemModel.findOne({_id: id});
  }

  async create(item: Item):Promise<Item>{
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string):Promise<Item>{
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item):Promise<Item>{
    return await this.itemModel.findByIdAndUpdate(id, item, {new: true});
  }

  /*
  //Hardcodes array of objects/values
  private readonly items: Item[]=[
      {
          id:"23456",
          name: "Item one",
          qty: 100,
          desc: "this is item one"
      },
      {
          id:"737637",
          name: "Item two",
          qty: 200,
          desc: "this is item twp"
      },
  ];

  findAll(): Item[] {
    return this.items;
  }
  findOne(id: string): Item {
    return this.items.find((item) => item.id === id);
  }
  */
}
