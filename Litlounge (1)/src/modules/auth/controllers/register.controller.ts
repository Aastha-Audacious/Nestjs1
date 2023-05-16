import {
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Controller,
  Get,
  Res,
  Query
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services';
import { DataResponse } from 'src/kernel';
import { SettingService } from 'src/modules/settings';
import { STATUS, ROLE_USER } from 'src/modules/user/constants';
import { Response } from 'express';
import { omit } from 'lodash';
import { EXCLUDE_FIELDS } from 'src/kernel/constants';
import { SETTING_KEYS } from 'src/modules/settings/constants';
import { AuthCreateDto } from '../dtos';
import { UserRegisterPayload } from '../payloads';
import { VerificationService, AuthService } from '../services';
// import { CustomerService } from 'src/modules/customer/services/customer.service';
import { v4 as uuidv4 } from 'uuid';
import { Client, Environment } from 'square';
import { UserModel } from 'src/modules/user/models';

@Controller('auth')
export class RegisterController {
  client: Client;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly verificationService: VerificationService,
    private readonly settingService: SettingService // private readonly customerService: CustomerService
  ) {
    this.client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox
    });
  }

  @Post('users/register')
  @HttpCode(HttpStatus.OK)
  async userRegister(
    @Body() req: UserRegisterPayload
  ): Promise<DataResponse<{ message: string }>> {
    const requireEmailVerification = SettingService.getValueByKey(
      'requireEmailVerification'
    );

    // const user = await this.userService.create(omit(req, EXCLUDE_FIELDS), {
    //   status: requireEmailVerification ? STATUS.PENDING : STATUS.ACTIVE,
    //   roles: ROLE_USER,
    //   emailVerified: !requireEmailVerification
    // });
    const idempotencyKey = uuidv4();

    const data = {
      idempotencyKey,
      ...req,
      updatedAt: new Date(),
      createdAt: new Date()
    } as any;
    console.log(data, 'data');
    const payload: any = {
      givenName: data.firstName,
      familyName: data.lastName,
      emailAddress: data.email
    };
    console.log('payload', payload);

    const result: any = await this.client.customersApi.createCustomer(payload);
    console.log(result);

    const customerId = result.result.customer.id;
    console.log('customerId', customerId);

    const userData = {
      ...omit(req, EXCLUDE_FIELDS),
      customerId // add customerId field to user data
    };

    const user = await this.userService.create(userData, {
      status: requireEmailVerification ? STATUS.PENDING : STATUS.ACTIVE,
      roles: ROLE_USER,
      emailVerified: !requireEmailVerification
    });

    await Promise.all([
      this.authService.create(
        new AuthCreateDto({
          source: 'user',
          sourceId: user._id,
          type: 'email',
          value: req.password,
          key: req.email
        })
      ),
      req.username &&
        this.authService.create(
          new AuthCreateDto({
            source: 'user',
            sourceId: user._id,
            type: 'username',
            value: req.password,
            key: req.username
          })
        )
    ]);
    // if require for email verification, we will send verification email
    requireEmailVerification &&
      (await this.verificationService.sendVerificationEmail(
        user._id,
        user.email,
        'user'
      ));
    return DataResponse.ok({
      message: requireEmailVerification
        ? 'We have sent an email to verify your email, please check your inbox.'
        : 'Your register has been successfully.'
    });
  }

  @Get('email-verification')
  public async verifyEmail(
    @Res() res: Response,
    @Query('token') token: string
  ) {
    if (!token) {
      return res.render('404.html');
    }

    const userUrl = await this.settingService.getKeyValue(
      SETTING_KEYS.USER_URL
    );

    await this.verificationService.verifyEmail(token);
    return res.redirect(userUrl || process.env.USER_URL);
  }
}
