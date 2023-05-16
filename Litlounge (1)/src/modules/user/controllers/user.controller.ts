import {
  HttpCode,
  HttpStatus,
  Controller,
  Get,
  Injectable,
  UseGuards,
  Request,
  Body,
  Put,
  HttpException,
  Post
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthGuard } from 'src/modules/auth/guards';
import { AuthService } from 'src/modules/auth/services';
import { CurrentUser } from 'src/modules/auth/decorators';
import { DataResponse } from 'src/kernel';
import { omit } from 'lodash';
import { EXCLUDE_FIELDS } from 'src/kernel/constants';
import { UserService } from '../services';
import { UserDto, IUserResponse } from '../dtos';
import { UserUpdatePayload } from '../payloads';
import { STATUS_ACTIVE } from '../constants';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  async me(@Request() request: Req): Promise<DataResponse<IUserResponse>> {
    const jwtToken = request.headers.authorization;
    const user = await this.authService.getSourceFromJWT(jwtToken);
    if (!user || user.status !== STATUS_ACTIVE) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.userService.findById(user._id);
    return DataResponse.ok(new UserDto(result).toResponse(true));
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateMe(
    @CurrentUser() currentUser: UserDto,
    @Body() payload: UserUpdatePayload
  ): Promise<DataResponse<IUserResponse>> {
    await this.userService.update(
      currentUser._id,
      omit(payload, EXCLUDE_FIELDS),
      currentUser
    );

    const user = await this.userService.findById(currentUser._id);
    return DataResponse.ok(new UserDto(user).toResponse(true));
  }

  @Get('/shipping-info')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getShippingInfo(@Request() req: any): Promise<any> {
    const { authUser } = req;
    const data = await this.userService.getShippingInfo(authUser.sourceId);
    return DataResponse.ok(data);
  }

  @Put('/verification')
  @UseGuards(AuthGuard)
  async updateVeriff(
    @CurrentUser() currentUser: UserDto,
    @Body()
    payload: {
      verificationId: string;
      veriffUrl: string;
    }
  ): Promise<DataResponse<IUserResponse>> {
    const user = await this.userService.update(
      currentUser._id,
      {
        ...omit(payload, EXCLUDE_FIELDS),
        veriffStatus: 'pending'
      },
      currentUser
    );
    return DataResponse.ok(new UserDto(user).toResponse(true));
  }

  @Post('/webhook')
  async webhook(
    @Body() body: { verification: any }
  ): Promise<DataResponse<IUserResponse>> {
    const { id: verificationId, code, reason } = body.verification;
    const user = await this.userService.findByVerificationId(verificationId);
    try {
      switch (Number(code)) {
        case 9001: // positive
          user.veriffStatus = 'success';
          user.roles.push('performer');
          await user.save();
          break;
        case 9102: // negative
          user.veriffStatus = 'failed';
          user.veriffReason = reason;
          await user.save();
          break;
        case 9103: // resubmitted
          user.veriffStatus = 'resubmitted';
          await user.save();
          break;
        case 9104: // expired
          user.veriffStatus = 'expired';
          await user.save();
          break;
        default:
          break;
      }
      return DataResponse.ok(new UserDto(user).toResponse(true));
    } catch (error) {
      return DataResponse.ok(new UserDto(user).toResponse(true));
    }
  }
}
