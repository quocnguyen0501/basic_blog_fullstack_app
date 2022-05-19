import { ApolloCache } from "@apollo/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import {
    LoginProfileDocument,
    Post,
    PostDocument,
    PostMutationResponse,
    PostQuery,
    PostQueryResult,
    PostsDocument,
    PostsQuery,
    PostUnionMutationResponseFragment,
    PostWithUserInfoFragment,
    PostWithUserInfoFragmentDoc,
    useVoteMutation,
    VoteType,
} from "../generated/graphql";
import { LIMIT } from "../pages";

interface UpvoteSectionProps {
    post: Post;
}

const VoteSection: FC<UpvoteSectionProps> = ({ post }: UpvoteSectionProps) => {
    const [vote, { loading }] = useVoteMutation();

    const [loadingState, setLoadingState] = useState<
        "upvote-loading" | "downvote-loading" | "not-loading"
    >("not-loading");

    const upVote = async (postId: string) => {
        setLoadingState("upvote-loading");
        await vote({
            variables: {
                postId: +postId,
                inputVoteValue: VoteType.UpVote,
            },
            update(cache: ApolloCache<any>) {
                // Update field points of post in cache
                cache.writeFragment<{ points: number }>({
                    id: `Post:${postId}`,
                    fragment: PostWithUserInfoFragmentDoc,
                    data: {
                        ...post,
                        points: post.points + 1,
                    },
                });
            },
        });
        setLoadingState("not-loading");
    };

    const downVote = async (postId: string) => {
        setLoadingState("downvote-loading");
        await vote({
            variables: {
                postId: +postId,
                inputVoteValue: VoteType.DownVote,
            },
            update(cache: ApolloCache<any>) {
                // Update field points of post in cache
                cache.writeFragment<{ points: number }>({
                    id: `Post:${postId}`,
                    fragment: PostWithUserInfoFragmentDoc,
                    data: {
                        ...post,
                        points: post.points - 1,
                    },
                });
            },
        });
        setLoadingState("not-loading");
    };
    return (
        <>
            <Flex direction="column" alignItems="center" mr={5}>
                <IconButton
                    icon={<ChevronUpIcon />}
                    aria-label="upvote"
                    onClick={upVote.bind(this, post.id)}
                    isLoading={loading && loadingState === 'upvote-loading'}
                />
                {post.points}
                <IconButton
                    icon={<ChevronDownIcon />}
                    aria-label="downvote"
                    onClick={downVote.bind(this, post.id)}
                    isLoading={loading && loadingState === 'downvote-loading'}
                />
            </Flex>
        </>
    );
};

export default VoteSection;
