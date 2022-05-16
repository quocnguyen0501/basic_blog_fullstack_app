import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Button,
    Stack,
    Flex,
} from "@chakra-ui/react";

import NextLink from "next/link";

import { HiDotsHorizontal } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { FC } from "react";

const MoreOptionsSinglePost: FC<{ postId: number }> = ({ postId }) => {
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
