import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto, UserListRequestDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req, file, cb) => {
          const filename = Date.now() + '-' + file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )
  async createUser(
    @Body() dto: CreateUserRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.createUser({ ...dto, imageUrl: file.path });
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
