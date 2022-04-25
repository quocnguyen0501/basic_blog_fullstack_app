import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { PostMutationResponse } from "../../types/graphql/PostMutationResponse";
import { CreatePostInput } from "../../types/input/CreatePostInput";
import { Post } from "../../models/Post.model";
import { UpdatePostInput } from "../../types/input/UpdatePostInput";
import { ErrorMutationResponse } from "../../types/graphql/ErrorMutationResponse";
import { getErrorMutationResponse } from "../../helpers/resolvers/ErrorMutationResponseHelper";
import { HTTP_STATUS_CODE } from "../../utils/constants/constants";

@Resolver()
export class PostResolver {
    @Mutation((_return) => PostMutationResponse || ErrorMutationResponse)
    async createPost(
        @Arg("createPostInput")
        { title, content }: CreatePostInput
    ): Promise<PostMutationResponse | ErrorMutationResponse> {
        try {
            const newPost = Post.create({
                title: title,
                content: content,
            });

            await newPost.save();

            return {
                code: HTTP_STATUS_CODE.SUCCESS,
                success: true,
                message: "Post created successfully",
                post: newPost,
            };
        } catch (error) {
            return getErrorMutationResponse(
                error,
                HTTP_STATUS_CODE.INTERNAL_SERVER,
                "post",
                "Error Create New Post in Mutation!"
            );
        }
    }

    @Mutation((_return) => PostMutationResponse || ErrorMutationResponse)
    async updatePost(
        @Arg("updatePostInput")
        { id, title, content }: UpdatePostInput
    ): Promise<PostMutationResponse | ErrorMutationResponse> {
        try {
            const existingPost = await Post.findOneBy({ id });
            if (!existingPost) {
                return {
                    code: HTTP_STATUS_CODE.BAD_REQUEST,
                    success: false,
                    message: "Post not found",
                };
            } else {
                existingPost.title = title;
                existingPost.content = content;

                await existingPost.save();

                return {
                    code: HTTP_STATUS_CODE.SUCCESS,
                    success: true,
                    message: "Post updated successfully",
                    post: existingPost,
                };
            }
        } catch (error) {
            return getErrorMutationResponse(
                error,
                HTTP_STATUS_CODE.INTERNAL_SERVER,
                "user",
                "error update post in mutation"
            );
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

    @Mutation((_return) => PostMutationResponse)
    async deletePost(
        @Arg("id", (_type) => ID)
        id: number
    ): Promise<PostMutationResponse | ErrorMutationResponse> {
        try {
            const existingPost = Post.findOneBy({ id });
            if (!existingPost) {
                return {
                    code: HTTP_STATUS_CODE.BAD_REQUEST,
                    success: false,
                    message: "Post not found",
                };
            } else {
                await Post.delete({ id });

                return {
                    code: HTTP_STATUS_CODE.SUCCESS,
                    success: true,
                    message: "Post deleted successfully",
                };
            }
        } catch (error) {
            return getErrorMutationResponse(
                error,
                HTTP_STATUS_CODE.INTERNAL_SERVER,
                "post",
                "Error in delete post mutation"
            );
        }
    }
}
