/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { SETTINGS } from 'src/app.utils';
import { UserRegisterRequestDto } from '../dto/user_register.req.dto';
import { UserService } from './user.service';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register!! Try again',
  })
  async doRegisterUser(
    @Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterRequestDto,
  ) {
    return await this.userService.doRegister(userRegister);
  }
}
