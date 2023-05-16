import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    // console.log("get error")
    return 'List of all users';
  }
  @Get(':userId')
  getUser(@Param() userId: string) {
    return userId;
  }

  @Post('create')
  create(@Req() req: Request) {
    return req.body;
  }

  @Patch()
  updateUser() {
    return 'User updated by patch';
  }

  @Put()
  update() {
    return 'User updated by put';
  }

  @Delete()
  deleteUser() {
    return 'User deleted';
  }
}
