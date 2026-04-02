import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, ListRequestPostDto, UpdatePostDto } from './post.dto';

export class PostRepository {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async createPost(dto: CreatePostDto, userId: number) {
    const user = {
      ...dto,
      createdAt: new Date(),
      createdBy: userId,
      author: { id: userId },
    };
    const post = this.postRepo.create(user);

    return this.postRepo.save(post);
  }

  async updatePost(id: number, dto: UpdatePostDto, userId: number) {
    const user = {
      ...dto,
      updateAt: new Date(),
      updateBy: userId,
    };
    return this.postRepo.update(id, user);
  }

  async getById(id: number) {
    return this.postRepo.findOne({
      relations: ['users'],
      where: { id: id },
    });
  }

  async postList(dto: ListRequestPostDto, userId: number) {
    const { page, limit, title } = dto;
    const query = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author ', 'author');

    if (title) {
      query.where('post.title ILIKE :title', { title: `${title}` });
    }
    if (userId) {
      query.andWhere('post.author = :author', { author: `${userId}` });
    }
    const result = await query
      .take((page - 1) * limit)
      .skip(limit)
      .getMany();

    return result;
  }

  async getPostByTitle(title: string, userId: number, id?: number) {
    const query = this.postRepo.createQueryBuilder('post');

    if (title) {
      query.where('post.title ILIKE :title ', { title: `%${title}%` });
    }

    if (userId) {
      query.andWhere('post.authorId = :userId', { userId });
    }

    if (id) {
      query.andWhere('post.id != :id', { id });
    }

    return query.getOne();
  }
}
