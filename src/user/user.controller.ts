import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto, UserListRequestDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserRequestDto) {
    return this.userService.createUser(dto);
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: number, @Body() dto: CreateUserRequestDto) {
    return this.userService.updateUser(id, dto);
  }

  @Get('list')
  async getUserList(@Query() dto: UserListRequestDto) {
    return this.userService.getUserList(dto);
  }

  @Get(':id')
  async userDetails(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }
}
