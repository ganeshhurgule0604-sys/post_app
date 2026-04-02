import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CreateUserRequestDto,
  updateUserDto,
  UserDto,
  UserListRequestDto,
} from './user.dto';
import { CreateAndUpdateEntityResponse, ResponseDto } from 'src/common/dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(
    dto: CreateUserRequestDto,
    action?: string,
  ): Promise<ResponseDto<CreateAndUpdateEntityResponse>> {
    await this.checkExistingUser(dto.name);
    const { password, ...rest } = dto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const encreptedPassword = await bcrypt.hash(password, 10);
    const result = await this.userRepo.createUser({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: encreptedPassword,
      ...rest,
    });
    return {
      data: {
        id: result.id,
        message: action
          ? 'Registration Complted Successfully'
          : 'User Created Successfully',
      },
      metaData: {},
    };
  }

  async getUserByName(name: string) {
    return this.userRepo.findOneByName(name);
  }
  async checkExistingUser(name: string, id?: number) {
    const existingUser = await this.userRepo.findOneByName(name, id);

    if (existingUser) {
      throw new ConflictException('User Already Exist with the name ');
    }
    return existingUser;
  }
  async updateUser(
    id: number,
    dto: updateUserDto,
  ): Promise<ResponseDto<CreateAndUpdateEntityResponse>> {
    await this.checkExistingUser(dto.name, id);
    await this.userRepo.updateUser(id, dto);

    return {
      data: { id: id, message: 'User Updated Successfully' },
      metaData: {},
    };
  }

  async findUserById(id: number): Promise<ResponseDto<UserDto>> {
    const result = await this.userRepo.findOneUserById(id);

    return {
      data: this.mapUserToDto(result),
      metaData: {},
    };
  }

  async getUserList(dto: UserListRequestDto) {
    const [users, count] = await this.userRepo.getUserList(dto);

    return {
      data: users.map((x) => this.mapUserToDto(x)),
      metadata: {
        totalUser: count,
        page: dto.page,
        limit: dto.limit,
      },
    };
  }

  mapUserToDto(user: User | null) {
    return { id: user?.id, name: user?.name, email: user?.email };
  }
}
