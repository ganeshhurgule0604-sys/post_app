import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto, ResponseDto } from 'src/common/dto';

export class CreateUserRequestDto {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsOptional()
  imageUrl?: string;
}

export class UserDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  email?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  iamgeUrl?: string;
}

export class UserListRequestDto extends PaginationDto {
  name!: string;

  email!: string;
}

export class updateUserDto extends CreateUserRequestDto {}

export class UserResponseDetailsDto extends ResponseDto<UserDto> {}

export class UserResponseListDto extends ResponseDto<UserDto[]> {}
