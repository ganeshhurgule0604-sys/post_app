import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import {
  CreateUserRequestDto,
  updateUserDto,
  UserListRequestDto,
} from './user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserRequestDto) {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async updateUser(id: number, dto: updateUserDto) {
    return this.userRepository.update(id, dto);
  }

  async findOneUserById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  async findOneByName(name: string, id?: number) {
    const query = this.userRepository
      .createQueryBuilder('users')
      .where('users.name ILike :name', { name });

    if (id) {
      query.andWhere('users.id!= :id', { id });
    }
    return query.getOne();
  }

  async getUserList(dto: UserListRequestDto) {
    const query = this.userRepository.createQueryBuilder('users');

    if (dto.email) {
      query.andWhere('users.email ILike :email', { email: `%${dto.email}%` });
    }

    if (dto.name) {
      query.andWhere('users.name ILike :name', { name: `%${dto.name}%` });
    }
    query.skip((dto.page - 1) * dto.limit).take(dto.limit);
    return query.getManyAndCount();
  }
}
