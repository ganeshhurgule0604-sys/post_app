import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, SignUpDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(dto: LoginDto) {
    const user = await this.userService.getUserByName(dto.name);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isMatch = bcrypt.campare(dto.password, user?.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return this.jwtService.sign(payload);
    }
  }

  async SignUp(dto: SignUpDto) {
    return this.userService.createUser(dto, 'signIn');
  }
}
