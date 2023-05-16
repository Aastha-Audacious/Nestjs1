import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item-dto';
import { Request, Response } from 'express';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id): Promise<Item> {
    return await this.itemService.findOne(id);
  }
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemService.create(createItemDto);
  }
  @Delete(':id')
  async delete(@Param('id') id): Promise<Item> {
    return await this.itemService.delete(id);
  }
  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }
  /*
    @Get()
    findAll(): Item[] {
      return this.itemService.findAll();
    }
    @Get()
    findAll(@Req() req: Request, @Res() res: Response):Response{
        console.log(req.url);
       return res.send('Hello aastha');
    }
    */

  /*
    @Get(':id')
    findOne(@Param() param): string{
        return `Item ${param.id}`
    }
    @Get(':id')
    findOne(@Param('id') id): Item {
      return this.itemService.findOne(id);
    }
    @Post()
    create(@Body() createItemDto: CreateItemDto): string {
      return `Name: ${createItemDto.name}, 
          Description: ${createItemDto.desc}, 
          Quantity: ${createItemDto.qty}`;
    }
    @Delete(':id')
    delete(@Param('id') id): string {
      return `Delete  ${id}`;
    }
    @Put(':id')
    update(@Body() updateItemDto: CreateItemDto, @Param('id') id): string {
      return `Update ${id} - Name: ${updateItemDto.name}`;
    }
    */




}
