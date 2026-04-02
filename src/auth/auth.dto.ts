import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

export class SignUpDto extends LoginDto {
  @IsString()
  email: string;
}
