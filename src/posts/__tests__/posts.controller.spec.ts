import { Test } from "@nestjs/testing";
import { Post as PostModel } from ".prisma/client";
import { CommentsService } from "../../comments/comments.service";
import { PrismaService } from "../../prisma/prisma.service";
import { PostsController } from "../posts.controller";
import { PostsService } from "../posts.service";

describe("PostsController", () => {
  let postsService: PostsService;
  let postsController: PostsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, CommentsService, PrismaService],
    }).compile();

    postsService = moduleRef.get<PostsService>(PostsService);
    postsController = moduleRef.get<PostsController>(PostsController);
  });

  describe("getPosts", () => {
    it("should return an array of posts", async () => {
      const result: PostModel[] = [
        {
          id: 1,
          userId: 1,
          title: "title1",
          body: "body1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 1,
          title: "title2",
          body: "body2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest
        .spyOn(postsService, "posts" as never)
        .mockImplementation(() => result as never);

      expect(await postsController.getPosts()).toBe(result);
    });
  });

  describe("getPostById", () => {
    it("should return a single post", async () => {
      const result: PostModel = {
        id: 1,
        userId: 1,
        title: "title1",
        body: "body1",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(postsService, "post" as never)
        .mockImplementation(() => result as never);

      expect(await postsController.getPostById("1")).toBe(result);
    });
  });
});
