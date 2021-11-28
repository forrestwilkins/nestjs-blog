import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from "typeorm";
import { PostEntity } from "./post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>
  ) {}

  async post(options: FindOneOptions<PostEntity>): Promise<PostEntity> {
    return this.postsRepository.findOne(options);
  }

  async posts(options?: FindManyOptions<PostEntity>): Promise<PostEntity[]> {
    return this.postsRepository.find(options);
  }

  async createPost(params: {
    userId: number;
    data: Partial<PostEntity>;
  }): Promise<PostEntity> {
    const { userId, data } = params;
    return this.postsRepository.create({ ...data, user: { id: userId } });
  }

  async updatePost(params: {
    where: FindConditions<PostEntity>;
    data: Partial<PostEntity>;
  }): Promise<UpdateResult> {
    const { data, where } = params;
    return this.postsRepository.update(where, data);
  }

  async deletePost(where: FindConditions<PostEntity>): Promise<DeleteResult> {
    return this.postsRepository.delete(where);
  }
}
