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

import { HiDotsHorizontal } from "react-icons/hi";
import { BsPinAngle } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

const MoreOptionsSinglePost = () => {
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
                            <hr/>
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
