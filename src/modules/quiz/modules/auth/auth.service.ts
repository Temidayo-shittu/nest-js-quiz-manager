import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserCredentials(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestException();
    console.log(user);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) throw new UnauthorizedException();

    return user;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
