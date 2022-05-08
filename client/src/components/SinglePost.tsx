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
import { Post } from "../generated/graphql";

interface PostProp {
    post: Post;
}

const SinglePost: FC<PostProp> = ({ post }: PostProp) => {
    const createdAt = new Date(post.creactedAt);

    const dayPost = createdAt.getDate();
    const monthPost = createdAt.getMonth();
    const yearPost = createdAt.getFullYear();

    console.log(
        `${createdAt.getHours()}h - ${createdAt.getMinutes()}p - ${createdAt.getSeconds()}s`
    );

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
                    <Text color={"gray.500"}>
                        {`${getMonthName(
                            monthPost + 1
                        )} ${dayPost}, ${yearPost}`}{" "}
                        · 6min read
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
                <Text color={"gray.500"}>{post.contentSnippet}</Text>
            </Stack>
        </Box>
    );
};

export default SinglePost;
