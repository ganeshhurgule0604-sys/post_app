import { ConflictException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import {
  CreatePostDto,
  UpdatePostDto,
  ListRequestPostDto,
  PostDTO,
} from './post.dto';
import { CreateAndUpdateEntityResponse, ResponseDto } from 'src/common/dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  async createPost(
    dto: CreatePostDto,
    userId: number,
  ): Promise<ResponseDto<CreateAndUpdateEntityResponse>> {
    await this.validatePost(dto.title, userId);
    const result = await this.postRepo.createPost(dto, userId);

    return this.mapCreateAndUpdateResponse(
      result.id,
      'Post created Successfully!',
    );
  }

  async updatePost(id: number, dto: UpdatePostDto, userId: number) {
    await this.validatePost(dto.title, userId);
    await this.postRepo.updatePost(id, dto, userId);

    return this.mapCreateAndUpdateResponse(id, 'Post Updated Suceessfully');
  }
  private mapCreateAndUpdateResponse(id: number, message: string) {
    return {
      data: { id: id, message: message },
      metaData: {},
    };
  }

  private async validatePost(title: string, userId: number, id?: number) {
    const post = await this.postRepo.getPostByTitle(title, userId, id);

    if (post) {
      throw new ConflictException('Post Already Exist!');
    }
  }

  async getPost(id: number) {
    const result = await this.postRepo.getById(id);
    return this.mapEntityToDto(result);
  }

  async list(
    dto: ListRequestPostDto,
    userId: number,
  ): Promise<ResponseDto<PostDTO[]>> {
    const result = await this.postRepo.postList(dto, userId);

    return {
      data: result.map((x) => this.mapEntityToDto(x)),
      metaData: {},
    };
  }

  private mapEntityToDto(result: Post | null) {
    if (!result) {
      throw new Error('Post not found');
    }
    return {
      id: result?.id,
      title: result?.title,
      description: result?.description,
      author: this.mapUser(result?.author),
      createdBy: this.mapUser(result?.author),
      updatedBy: this.mapUser(result?.author),
    };
  }

  private mapUser(dto: any) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      id: dto?.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: dto?.name,
    };
  }
}
