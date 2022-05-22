import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Button,
    Stack,
} from "@chakra-ui/react";

import NextLink from "next/link";

import { HiDotsHorizontal } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { FC } from "react";
import { PaginatedPost, useDeletePostMutation } from "../generated/graphql";
import { ApolloCache, Reference } from "@apollo/client";
import { useRouter } from "next/router";

const MoreOptionsSinglePost: FC<{ postId: number }> = ({ postId }) => {
    const router = useRouter();

    const [deletePost, { loading }] = useDeletePostMutation();

    const handleDeletePostClick = async () => {
        await deletePost({
            variables: {
                id: postId.toString(),
            },
            update(cache: ApolloCache<any>) {
                cache.modify({
                    fields: {
                        posts(
                            existing: Pick<
                                PaginatedPost,
                                | "__typename"
                                | "timeCompareCreatedAt"
                                | "hasMore"
                                | "totalPost"
                            > & { paginatedPosts: Reference[] }
                        ) {
                            const newPostsAfterDeletion = {
                                ...existing,
                                totalPost: existing.totalPost - 1,
                                paginatedPosts: existing.paginatedPosts.filter(
                                    (postRefObject: Reference) =>
                                        postRefObject.__ref !== `Post:${postId}`
                                ),
                            };

                            return newPostsAfterDeletion;
                        },
                    },
                });
            },
        });

        if (router.route !== "/") router.push("/");
    };

    return (
        <>
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <IconButton
                        aria-label="More server options"
                        icon={<HiDotsHorizontal />}
                        variant="solid"
                        w="fit-content"
                    />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
                    <PopoverArrow />
                    <PopoverBody>
                        <Stack>
                            <NextLink href={`/post/edit/${postId}`}>
                                <Button
                                    w="194px"
                                    variant="ghost"
                                    rightIcon={<MdModeEdit />}
                                    justifyContent="space-between"
                                    fontWeight="normal"
                                    colorScheme="green"
                                    fontSize="sm"
                                >
                                    Edit post
                                </Button>
                            </NextLink>
                            <hr />
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<IoTrashOutline />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                colorScheme="red"
                                fontSize="sm"
                                onClick={handleDeletePostClick}
                                isLoading={loading}
                            >
                                Move to trash
                            </Button>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default MoreOptionsSinglePost;
