import { ApolloCache } from "@apollo/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import {
    LoginProfileDocument,
    Post,
    PostWithUserInfoFragmentDoc,
    UserLogedInVotedAndPointsFragmentDoc,
    useVoteMutation,
    VoteType,
} from "../generated/graphql";
import { LIMIT } from "../pages";
import { VoteTypeValues } from "../types/enum/VoteTypeValues.enum";

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
                cache.writeFragment<{
                    userLogedInVoted: number;
                    points: number;
                }>({
                    id: `Post:${postId}`,
                    fragment: UserLogedInVotedAndPointsFragmentDoc,
                    data: {
                        userLogedInVoted:
                            post.userLogedInVoted + VoteTypeValues.UP_VOTE,
                        points: post.points + VoteTypeValues.UP_VOTE,
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
                cache.writeFragment<{
                    userLogedInVoted: number;
                    points: number;
                }>({
                    id: `Post:${postId}`,
                    fragment: UserLogedInVotedAndPointsFragmentDoc,
                    data: {
                        userLogedInVoted:
                            post.userLogedInVoted + VoteTypeValues.DOWN_VOTE,
                        points: post.points + VoteTypeValues.DOWN_VOTE,
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
                    onClick={
                        post.userLogedInVoted === VoteTypeValues.UP_VOTE
                            ? undefined
                            : upVote.bind(this, post.id)
                    }
                    colorScheme={
                        post.userLogedInVoted === VoteTypeValues.UP_VOTE
                            ? "blue"
                            : undefined
                    }
                    isLoading={loading && loadingState === "upvote-loading"}
                />
                {post.points}
                <IconButton
                    icon={<ChevronDownIcon />}
                    aria-label="downvote"
                    onClick={
                        post.userLogedInVoted === VoteTypeValues.DOWN_VOTE
                            ? undefined
                            : downVote.bind(this, post.id)
                    }
                    colorScheme={
                        post.userLogedInVoted === VoteTypeValues.DOWN_VOTE
                            ? "red"
                            : undefined
                    }
                    isLoading={loading && loadingState === "downvote-loading"}
                />
            </Flex>
        </>
    );
};

export default VoteSection;
