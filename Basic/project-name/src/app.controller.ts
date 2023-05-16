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

@Controller()
export class AppController {
  @Get()
  home(): string {
    // console.log("home error")
    return 'Welcome to homepage';
  }
}
