import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, ListRequestPostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
@UseGuards(AuthGuard('JWT'))
export class PostController {
  constructor(private readonly postSerive: PostService) {}

  @Post('create')
  create(@Body() dto: CreatePostDto, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.postSerive.createPost(dto, req.user.id);
  }

  @Put('update/:id')
  update(@Body() dto: CreatePostDto, @Param('id') id: number, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.postSerive.updatePost(id, dto, req.user.id);
  }
  @Get('list')
  list(@Body() dto: ListRequestPostDto, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.postSerive.list(dto, req.user.id);
  }
  @Get(':id')
  getList(@Param() id: number) {
    return this.postSerive.getPost(id);
  }
}
