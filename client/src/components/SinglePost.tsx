import {
    Box,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Flex,
    Link,
} from "@chakra-ui/react";
import { MdPublic } from "react-icons/md";
import { FC, useEffect, useState } from "react";
import NextLink from "next/link";
import { LoginProfileQuery, Post } from "../generated/graphql";
import moment from "moment";
import { setTimeIntervalCreatedAtDisplay } from "../helpers/singlePostHelper";
import MoreOptionsSinglePost from "./MoreOptionsSinglePost";
import VoteSection from "./VoteSection";

interface PostProp {
    post: Post;
    loginProfileData: LoginProfileQuery;
}

const SinglePost: FC<PostProp> = ({ post, loginProfileData }: PostProp) => {
    const createdAt = new Date(post.createdAt);

    /**
     * Use if want to display day month year post
     */
    // const dayPost = createdAt.getDate();
    // const monthPost = createdAt.getMonth();
    // const yearPost = createdAt.getFullYear();

    const [createdAtDisplay, setCreatedAtDisplay] = useState("");
    useEffect(() => {
        const timeInterval = setTimeIntervalCreatedAtDisplay(createdAt);

        if (timeInterval !== null) {
            setCreatedAtDisplay(moment(createdAt).fromNow());

            const interval = setInterval(() => {
                setCreatedAtDisplay(moment(createdAt).fromNow());
            }, timeInterval);
            return () => clearInterval(interval);
        } else {
            setCreatedAtDisplay(moment(createdAt).calendar());
        }
    }, [createdAtDisplay]);

    return (
        <>
            <Box
                width={"900px"}
                minW={"900px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                p={6}
                my={6}
                overflow={"hidden"}
            >
                <Flex justifyItems={"center"} alignItems={"center"}>
                    <VoteSection
                        post={post}
                        loginProfileData={loginProfileData}
                    />
                    <Box w={"full"}>
                        <Flex justifyContent={"space-between"}>
                            <Stack
                                mb={6}
                                direction={"row"}
                                spacing={4}
                                align={"center"}
                            >
                                <Avatar />
                                <Stack
                                    direction={"column"}
                                    spacing={0}
                                    fontSize={"sm"}
                                >
                                    <Text fontWeight={600}>
                                        {`${post.user.surname} ${post.user.firstName}`}
                                    </Text>
                                    <Flex
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
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
                            <Box>
                                {loginProfileData?.loginProfile?.id ===
                                    post.userId.toString() && (
                                    <MoreOptionsSinglePost postId={+post.id} />
                                )}
                            </Box>
                        </Flex>
                        <Stack>
                            <NextLink href={`/post/${post.id}`}>
                                <Link>
                                    <Heading
                                        color={useColorModeValue(
                                            "gray.700",
                                            "white"
                                        )}
                                        fontSize={"2xl"}
                                        fontFamily={"body"}
                                    >
                                        {post.title}
                                    </Heading>
                                </Link>
                            </NextLink>
                            <Box
                                textColor={"gray.500"}
                                dangerouslySetInnerHTML={{
                                    __html: post.contentSnippet,
                                }}
                            ></Box>
                        </Stack>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default SinglePost;
