import { HTTP_STATUS_CODE } from "./../../utils/constants/constants";
import {
    Arg,
    Ctx,
    FieldResolver,
    ID,
    Int,
    Mutation,
    Query,
    registerEnumType,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { CreatePostInput } from "../../types/input/CreatePostInput";
import { Post } from "../../models/postgres/Post.model";
import { UpdatePostInput } from "../../types/input/UpdatePostInput";
import { getErrorMutationResponse } from "../../helpers/resolvers/ErrorMutationResponseHelper";
import { checkAuth } from "../../middleware/auth/checkAuth";
import { DATA_SOURCE } from "../../helpers/database/DatabaseHelper";
import { PostUnionMutationResponse } from "../../types/graphql/unions/PostUnionMutationResponse";
import { User } from "../../models/postgres/User.model";
import { PaginatedPost } from "../../types/graphql/PaginatedPost";
import { LessThan } from "typeorm";
import { Context } from "../../types/graphql/Context";
import { VoteType } from "../../types/enum/VoteType.enum";
import { Vote } from "../../models/postgres/Vote.model";

registerEnumType(VoteType, {
    name: "VoteType", // this one is mandatory
});
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
        parent: Post,
        @Ctx()
        { dataLoaders: { userLoader } }: Context
    ) {
        return await userLoader.load(parent.userId);
    }

    @FieldResolver((_return) => Int)
    async userLogedInVoted(
        @Root()
        parent: Post,
        @Ctx()
        { req, dataLoaders: { userLogedInVotedLoader } }: Context
    ) {
        if (!req.session.userId) {
            const VOTE_TYPE = 0;
            return VOTE_TYPE;
        } else {
            // const existingVote = await Vote.findOne({
            //     where: {
            //         postId: parent.id,
            //         userId: req.session.userId,
            //     },
            // });
            const existingVote = await userLogedInVotedLoader.load({
                postId: parent.id,
                userId: req.session.userId,
            });

            return existingVote ? existingVote.value : 0;
        }
    }

    @Mutation((_return) => [PostUnionMutationResponse])
    @UseMiddleware(checkAuth)
    async createPost(
        @Arg("createPostInput")
        { title, content }: CreatePostInput,
        @Ctx()
        { req }: Context
    ): Promise<Array<typeof PostUnionMutationResponse>> {
        try {
            const newPost = Post.create({
                userId: req.session.userId,
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
        { id, title, content }: UpdatePostInput,
        @Ctx()
        { req }: Context
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
            } else if (existingPost.userId !== req.session.userId) {
                return [
                    {
                        code: HTTP_STATUS_CODE.UNAUTHORIZED,
                        success: false,
                        message: "Unauthorized",
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

    @Query((_return) => PaginatedPost, { nullable: true })
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

            let lastPostArr: Post[] = [];

            if (timeCompareCreatedAt) {
                findOptions.where = {
                    createdAt: LessThan(timeCompareCreatedAt),
                };

                lastPostArr = await Post.find({
                    order: {
                        createdAt: "ASC",
                    },
                    take: 1,
                });
            }

            const totalPost = await Post.count();

            if (totalPost === 0) {
                return {
                    totalPost: totalPost,
                    timeCompareCreatedAt: new Date(),
                    hasMore: false,
                    paginatedPosts: [],
                };
            } else {
                const paginatedPosts = await Post.find(findOptions);

                const hasMore: boolean = timeCompareCreatedAt
                    ? paginatedPosts[
                          paginatedPosts.length - 1
                      ].createdAt.toString() !==
                      lastPostArr[0].createdAt.toString()
                    : paginatedPosts.length !== totalPost;

                const timeCompareCreatedAtResult =
                    paginatedPosts[paginatedPosts.length - 1].createdAt;

                return {
                    totalPost: totalPost,
                    timeCompareCreatedAt: timeCompareCreatedAtResult,
                    hasMore: hasMore,
                    paginatedPosts: paginatedPosts,
                };
            }
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
        id: number,
        @Ctx()
        { req }: Context
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
            } else if (existingPost.userId !== req.session.userId) {
                return [
                    {
                        code: HTTP_STATUS_CODE.UNAUTHORIZED,
                        success: false,
                        message: "Unauthorized",
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

    @Mutation((_return) => [PostUnionMutationResponse])
    @UseMiddleware(checkAuth)
    async vote(
        @Arg("postId", (_type) => Int)
        postId: number,
        @Arg("inputVoteValue", (_type) => VoteType)
        inputVoteValue: VoteType,
        @Ctx()
        {
            req: {
                session: { userId },
            },
            connection,
        }: Context
    ): Promise<Array<typeof PostUnionMutationResponse>> {
        return connection.transaction(async (transactionEntityManager) => {
            // Check post exists
            let post = await transactionEntityManager.findOne(Post, {
                where: {
                    id: postId,
                },
            });

            if (!post) {
                return [
                    {
                        code: HTTP_STATUS_CODE.BAD_REQUEST,
                        success: false,
                        message: "Post not found",
                    },
                ];
            }

            // check if use has voted
            const existingVote = await transactionEntityManager.findOne(Vote, {
                where: {
                    postId: postId,
                    userId: userId as number,
                },
            });

            if (existingVote && existingVote.value !== inputVoteValue) {
                // Update vote value 1 -> -1 | -1 -> 1
                await transactionEntityManager.save(Vote, {
                    postId: existingVote.postId,
                    userId: existingVote.userId,
                    value: inputVoteValue,
                });

                post = await transactionEntityManager.save(Post, {
                    id: postId,
                    userId: post.userId,
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                    points: post.points + inputVoteValue,
                });
            }

            if (!existingVote) {
                const VOTE_VALUES = {
                    userId: userId,
                    postId: postId,
                    value: inputVoteValue,
                };

                // create new vote
                const newVote = transactionEntityManager.create(
                    Vote,
                    VOTE_VALUES
                );

                await transactionEntityManager.save(newVote);

                post = await transactionEntityManager.save(Post, {
                    id: postId,
                    userId: post.userId,
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                    points: post.points + inputVoteValue,
                });
            }

            return [
                {
                    code: HTTP_STATUS_CODE.SUCCESS,
                    success: true,
                    message: "Post voted successfully",
                    post: post,
                },
            ];
        });
    }
}
