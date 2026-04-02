import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

export class PostDTO {
  id: number;
  title: string;
  description: string;
  author: {
    id: number;
    name: string;
  };
}

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdatePostDto extends CreatePostDto {}

export class ListRequestPostDto extends PaginationDto {
  @IsOptional()
  title: string;
}
