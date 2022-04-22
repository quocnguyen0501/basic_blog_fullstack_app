import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { PostMutationResponse } from "../../types/graphql/PostMutationResponse";
import { CreatePostInput } from "../../types/input/CreatePostInput";
import { Post } from "../../models/Post.model";

@Resolver()
export class PostResolver {
    @Mutation((_return) => PostMutationResponse)
    async createPost(
        @Arg("createPostInput")
        { title, content }: CreatePostInput
    ): Promise<PostMutationResponse> {
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
            console.log(error);
            return {
                code: 500,
                success: false,
                message: `>>> Internal Server Error: ${error.message}`,
                errors: [
                    {
                        field: "email",
                        message: "Email already taken!",
                    },
                ],
            };
        }
    }

    @Query((_return) => [Post])
    async posts(): Promise<Post[]> {
        return Post.find();
    }

    @Query((_return) => Post, {
        nullable: true,
    })
    async post(
        @Arg("id", (_type) => ID)
        id: number
    ): Promise<Post | null> {
        return await Post.findOneBy({ id: id });
    }
}
