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
import { CommentEntity } from "./comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>
  ) {}

  async comment(
    options: FindOneOptions<CommentEntity>
  ): Promise<CommentEntity | null> {
    return this.commentsRepository.findOne(options);
  }

  async comments(
    options?: FindManyOptions<CommentEntity>
  ): Promise<CommentEntity[]> {
    return this.commentsRepository.find(options);
  }

  async createComment(params: {
    body: string;
    userId: number;
    postId?: number;
    commentId?: number;
  }): Promise<CommentEntity> {
    const { body, userId, postId, commentId } = params;
    return this.commentsRepository.create({
      body,
      user: { id: userId },
      post: { id: postId },
      comment: { id: commentId },
    });
  }

  async updateComment(params: {
    where: FindConditions<CommentEntity>;
    data: Partial<CommentEntity>;
  }): Promise<UpdateResult> {
    const { data, where } = params;
    return this.commentsRepository.update(where, data);
  }

  async deleteComment(
    where: FindConditions<CommentEntity>
  ): Promise<DeleteResult> {
    return this.commentsRepository.delete(where);
  }
}
