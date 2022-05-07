import Image from "next/image";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
} from "@chakra-ui/react";
import { IPost } from "../types/props/IPost.props";
import { FC } from "react";
import { getMonthName } from "../helpers/DateOfBirthHelper";

interface PostProp {
    post: IPost;
}

const SinglePost: FC<PostProp> = ({ post }: PostProp) => {
    const dayPost = new Date(post.creactedAt).getDate();
    const monthPost = new Date(post.creactedAt).getMonth();
    const yearPost = new Date(post.creactedAt).getFullYear();

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
                <Avatar
                    src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
                />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                    <Text fontWeight={600}>Achim Rolle</Text>
                    <Text color={"gray.500"}>
                        {`${getMonthName(monthPost + 1)} ${dayPost}, ${yearPost}`} · 6min read
                    </Text>
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
                <Text color={"gray.500"}>{post.content}</Text>
            </Stack>
        </Box>
    );
};

export default SinglePost;
