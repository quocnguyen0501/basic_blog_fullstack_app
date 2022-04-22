import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { PostMutationResponse } from "../../types/graphql/PostMutationResponse";
import { CreatePostInput } from "../../types/input/CreatePostInput";
import { Post } from "../../models/Post.model";
import { UpdatePostInput } from "../../types/input/UpdatePostInput";
import { ErrorMutationResponse } from "../../types/graphql/ErrorMutationResponse";
import { getErrorMutationResponse } from "../../helpers/resolvers/ErrorMutationResponseHelper";

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
                code: 200,
                success: true,
                message: "Post created successfully",
                post: newPost,
            };
        } catch (error) {
            return getErrorMutationResponse(
                error,
                500,
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
            const existingPost = Post.findOneBy({ id });
            if (!existingPost) {
                return {
                    code: 400,
                    success: false,
                    message: "Post not found",
                };
            }
        } catch (error) {
            return getErrorMutationResponse(
                error,
                500,
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
}
