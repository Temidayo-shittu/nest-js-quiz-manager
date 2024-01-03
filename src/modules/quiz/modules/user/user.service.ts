/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from 'src';
import { UserRegisterRequestDto } from '../dto/user_register.req.dto';

@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async doRegister(userRegister: UserRegisterRequestDto): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;
    return await user.save();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await User.findOne({ where: { email } });
  }
}
