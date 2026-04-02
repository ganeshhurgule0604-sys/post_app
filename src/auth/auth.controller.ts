import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.logIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.SignUp(dto);
  }
}
