import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
import { PostWithUserInfoFragment } from "../generated/graphql";

interface UpvoteSectionProps {
    post: PostWithUserInfoFragment;
}

const VoteSection: FC<UpvoteSectionProps> = ({ post }: UpvoteSectionProps) => {
    return (
        <>
            <Flex direction="column" alignItems="center" mr={5}>
                <IconButton icon={<ChevronUpIcon />} aria-label="upvote" />
                {post.points}
                <IconButton icon={<ChevronDownIcon />} aria-label="downvote" />
            </Flex>
        </>
    );
};

export default VoteSection;
