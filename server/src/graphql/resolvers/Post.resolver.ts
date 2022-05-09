import {
    Arg,
    FieldResolver,
    ID,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { CreatePostInput } from "../../types/input/CreatePostInput";
import { Post } from "../../models/Post.model";
import { UpdatePostInput } from "../../types/input/UpdatePostInput";
import { getErrorMutationResponse } from "../../helpers/resolvers/ErrorMutationResponseHelper";
import { HTTP_STATUS_CODE } from "../../utils/constants/constants";
import { checkAuth } from "../../middleware/auth/checkAuth";
import { DATA_SOURCE } from "../../helpers/database/DatabaseHelper";
import { PostUnionMutationResponse } from "../../types/graphql/unions/PostUnionMutationResponse";
import { User } from "../../models/User.model";
import { PaginatedPost } from "../../types/graphql/PaginatedPost";
import { LessThan } from "typeorm";

@Resolver((_of) => Post)
export class PostResolver {
    /**
     * Field Resolver => Nếu muốn định nghĩa thêm Field dư thừa
     * không cần thiết phải lưu trong DB được suy ra từ các Field
     * của 1 Object có sẵn.
     *
     * @param parent: parent result of query return before if have a before query version
     * @returns : Content snippet
     */
    @FieldResolver((_return) => String)
    contentSnippet(
        @Root()
        parent: Post
    ) {
        const START_CHARS_INDEX = 0;
        const END_CHARS_INDEX = 150;

        return parent.content.slice(START_CHARS_INDEX, END_CHARS_INDEX);
    }

    @FieldResolver((_return) => User)
    async user(
        @Root()
        parent: Post
    ) {
        return await User.findOneBy({
            id: parent.userId,
        });
    }

    @Mutation((_return) => [PostUnionMutationResponse])
    @UseMiddleware(checkAuth)
    async createPost(
        @Arg("createPostInput")
        { userId, title, content }: CreatePostInput
    ): Promise<Array<typeof PostUnionMutationResponse>> {
        try {
            const newPost = Post.create({
                userId: userId,
                title: title,
                content: content,
            });

            await newPost.save();

            return [
                {
                    code: HTTP_STATUS_CODE.SUCCESS,
                    success: true,
                    message: "Post created successfully",
                    post: newPost,
                },
            ];
        } catch (error) {
            return [
                getErrorMutationResponse(
                    error,
                    HTTP_STATUS_CODE.INTERNAL_SERVER,
                    "post",
                    "Error Create New Post in Mutation!"
                ),
            ];
        }
    }

    @Mutation((_return) => [PostUnionMutationResponse])
    @UseMiddleware(checkAuth)
    async updatePost(
        @Arg("updatePostInput")
        { id, title, content }: UpdatePostInput
    ): Promise<Array<typeof PostUnionMutationResponse>> {
        try {
            const existingPost = await Post.findOneBy({ id });

            if (!existingPost) {
                return [
                    {
                        code: HTTP_STATUS_CODE.BAD_REQUEST,
                        success: false,
                        message: "Post not found",
                    },
                ];
            } else {
                await DATA_SOURCE.createQueryBuilder()
                    .update(Post)
                    .set({
                        title: title,
                        content: content,
                    })
                    .where("id = :id", { id: id })
                    .execute();

                return [
                    {
                        code: HTTP_STATUS_CODE.SUCCESS,
                        success: true,
                        message: "Post updated successfully",
                        post: (await Post.findOneBy({ id })) as Post,
                    },
                ];
            }
        } catch (error) {
            return [
                getErrorMutationResponse(
                    error,
                    HTTP_STATUS_CODE.INTERNAL_SERVER,
                    "user",
                    "error update post in mutation"
                ),
            ];
        }
    }

    @Query((_return) => PaginatedPost)
    async posts(
        @Arg("limit", (_type) => Int)
        limit: number,
        @Arg("timeCompareCreatedAt", {
            nullable: true,
        })
        timeCompareCreatedAt?: string
    ): Promise<PaginatedPost | null> {
        try {
            const MIN_LIMIT_POST = 5;
            
            /**
             * If recieve a wrong request from client -> set limit default is 5
             */
            const LIMIT = Math.min(MIN_LIMIT_POST, limit);

            let findOptions: { [key: string]: any };

            findOptions = {
                order: {
                    createdAt: "DESC",
                },
                take: LIMIT,
            };

            let lastPost: Post = new Post();

            if (timeCompareCreatedAt) {
                findOptions.where = {
                    createdAt: LessThan(timeCompareCreatedAt),
                };

                lastPost = (
                    await Post.find({
                        order: {
                            createdAt: "DESC",
                        },
                        take: 1,
                    })
                )[0];
            }

            const totalPost = await Post.count();

            const paginatedPosts = await Post.find(findOptions);
            
            const hasMore: boolean = timeCompareCreatedAt
                ? paginatedPosts[
                      paginatedPosts.length - 1
                  ].createdAt.toString() !== lastPost.createdAt.toString()
                : paginatedPosts.length !== totalPost;

            const timeCompareCreatedAtResult =
                paginatedPosts[paginatedPosts.length - 1].createdAt;

            return {
                totalPost: totalPost,
                timeCompareCreatedAt: timeCompareCreatedAtResult,
                hasMore: hasMore,
                paginatedPosts: paginatedPosts,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    @Query((_return) => Post, {
        nullable: true,
    })
    async post(
        @Arg("id", (_type) => ID)
        id: number
    ): Promise<Post | null> {
        try {
            return await Post.findOneBy({ id: id });
        } catch (error) {
            return null;
        }
    }

    @Mutation((_return) => [PostUnionMutationResponse])
    @UseMiddleware(checkAuth)
    async deletePost(
        @Arg("id", (_type) => ID)
        id: number
    ): Promise<Array<typeof PostUnionMutationResponse>> {
        try {
            const existingPost = Post.findOneBy({ id });
            if (!existingPost) {
                return [
                    {
                        code: HTTP_STATUS_CODE.BAD_REQUEST,
                        success: false,
                        message: "Post not found",
                    },
                ];
            } else {
                await Post.delete({ id });

                return [
                    {
                        code: HTTP_STATUS_CODE.SUCCESS,
                        success: true,
                        message: "Post deleted successfully",
                    },
                ];
            }
        } catch (error) {
            return [
                getErrorMutationResponse(
                    error,
                    HTTP_STATUS_CODE.INTERNAL_SERVER,
                    "post",
                    "Error in delete post mutation"
                ),
            ];
        }
    }
}
