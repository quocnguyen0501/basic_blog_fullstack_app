import Image from "next/image";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import { MdPublic } from "react-icons/md";
import { FC, useEffect, useState } from "react";
import { getMonthName } from "../helpers/DateOfBirthHelper";
import { Post } from "../generated/graphql";
import moment from "moment";
import { setTimeIntervalCreatedAtDisplay } from "../helpers/singlePostHelper";

interface PostProp {
    post: Post;
}

const SinglePost: FC<PostProp> = ({ post }: PostProp) => {
    const createdAt = new Date(post.creactedAt);

    /**
     * Use if want to display day month year post
     */
    // const dayPost = createdAt.getDate();
    // const monthPost = createdAt.getMonth();
    // const yearPost = createdAt.getFullYear();

    const timeDisplay = moment(createdAt).fromNow();

    const now = Date.now();
    const [createdAtDisplay, setCreatedAtDisplay] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(">>> SET TIME DISPLAY: ", setTimeIntervalCreatedAtDisplay(createdAt));
            console.log(moment(now).fromNow());
            
            setCreatedAtDisplay(moment(createdAt).fromNow());
        }, 1000);
        return () => clearInterval(interval);
    }, [createdAtDisplay]);

    return (
        <Box
            width={"950px"}
            minW={"950px"}
            w={"full"}
            zIndex={"2"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            my={6}
            overflow={"hidden"}
        >
            <Stack mb={6} direction={"row"} spacing={4} align={"center"}>
                <Avatar />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                    <Text
                        fontWeight={600}
                    >{`${post.user.surname} ${post.user.firstName}`}</Text>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <Text color={"gray.500"} mr={"5px"}>
                            {/* {`${getMonthName(
                                monthPost + 1
                            )} ${dayPost}, ${yearPost}`} */}
                            {createdAtDisplay} .
                        </Text>
                        <MdPublic />
                    </Flex>
                </Stack>
            </Stack>
            <Stack>
                <Heading
                    color={useColorModeValue("gray.700", "white")}
                    fontSize={"2xl"}
                    fontFamily={"body"}
                >
                    {post.title}
                </Heading>
                <Text color={"gray.500"}>{post.contentSnippet}</Text>
            </Stack>
        </Box>
    );
};

export default SinglePost;
