import {
    Arg,
    ID,
    Mutation,
    Query,
    Resolver,
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

@Resolver()
export class PostResolver {
    @Mutation((_return) => [PostUnionMutationResponse])
    @UseMiddleware(checkAuth)
    async createPost(
        @Arg("createPostInput")
        { title, content }: CreatePostInput
    ): Promise<Array<typeof PostUnionMutationResponse>> {
        try {
            const newPost = Post.create({
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

    @Query((_return) => [Post])
    async posts(): Promise<Post[] | null> {
        try {
            return Post.find();
        } catch (error) {
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
