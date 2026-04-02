export class LoginDto {
  name: string;
  password: string;
}

export class SignUpDto extends LoginDto {
  email: string;
}
