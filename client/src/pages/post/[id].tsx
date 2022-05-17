import { useRouter } from "next/router";
import {
    Avatar,
    Box,
    Center,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
    PostDocument,
    PostIDsDocument,
    PostIDsQuery,
    PostQuery,
    useLoginProfileQuery,
    usePostIDsQuery,
    usePostQuery,
} from "../../generated/graphql";
import { CloseIcon } from "@chakra-ui/icons";
import LoadingSpinner from "../../components/LoadingSpinner";
import MoreOptionsSinglePost from "../../components/MoreOptionsSinglePost";
import { MdPublic } from "react-icons/md";
import { setTimeIntervalCreatedAtDisplay } from "../../helpers/singlePostHelper";
import moment from "moment";
import { GetStaticPaths, GetStaticProps } from "next";
import { LIMIT } from "../index";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import Navbar from "../../components/Navbar";

const Post = () => {
    const { data: loginProfileData, loading: useLoginProfileLoading } =
        useLoginProfileQuery();

    const router = useRouter();

    const [createdAtDisplay, setCreatedAtDisplay] = useState("");

    const POST_ID = router.query.id;

    const { data, loading, error } = usePostQuery({
        variables: {
            id: POST_ID.toString() as string,
        },
    });

    if (loading || useLoginProfileLoading || !data) {
        return (
            <>
                <Center pt={20} pb={6} px={2} zIndex={"2"}>
                    <LoadingSpinner />
                </Center>
            </>
        );
    }

    if (error || !data?.post) {
        return (
            <>
                <Navbar
                    data={loginProfileData}
                    useLoginProfileLoading={useLoginProfileLoading}
                />
                <Center pt={20} pb={6} px={2} zIndex={"2"}>
                    <Box textAlign="center" py={10} px={6}>
                        <Box display="inline-block">
                            <Flex
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                bg={"red.500"}
                                rounded={"50px"}
                                w={"55px"}
                                h={"55px"}
                                textAlign="center"
                            >
                                <CloseIcon boxSize={"20px"} color={"white"} />
                            </Flex>
                        </Box>
                        <Heading as="h2" size="xl" mt={6} mb={2}>
                            Crash for this post
                        </Heading>
                        <Text color={"gray.500"}>
                            {error ? error.message : "Post not found"}
                        </Text>
                    </Box>
                </Center>
            </>
        );
    } else {
        const createdAt = new Date(data.post.createdAt);

        /**
         * Use if want to display day month year post
         */
        // const dayPost = createdAt.getDate();
        // const monthPost = createdAt.getMonth();
        // const yearPost = createdAt.getFullYear();
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
    }
    return (
        <>
            <Navbar
                data={loginProfileData}
                useLoginProfileLoading={useLoginProfileLoading}
            />
            <Center pt={20} pb={6} px={2} zIndex={"2"}>
                <Box
                    maxW={"900px"}
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
                                    {`${data.post.user.surname} ${data.post.user.firstName}`}
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
                                data.post.userId.toString() && (
                                <MoreOptionsSinglePost postId={+POST_ID} />
                            )}
                        </Box>
                    </Flex>
                    <Stack>
                        <Heading
                            color={useColorModeValue("gray.700", "white")}
                            fontSize={"2xl"}
                            fontFamily={"body"}
                        >
                            {data.post.title}
                        </Heading>
                        <Box
                            textColor={"gray.500"}
                            dangerouslySetInnerHTML={{
                                __html: data.post.content,
                            }}
                        ></Box>
                    </Stack>
                </Box>
            </Center>
        </>
    );
};

/**
 *
 * @returns array of detail page post [
 *      {params: {id: '1'}},
 *      {params: {id: '2'}},
 *      ...
 * ]
 */
export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<PostIDsQuery>({
        query: PostIDsDocument,
        variables: {
            limit: LIMIT,
        },
    });

    return {
        paths: data.posts.paginatedPosts.map((post) => ({
            params: {
                id: post.id.toString(),
            },
        })),
        // Display when this page render finished
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<
    { [key: string]: any },
    { id: string }
> = async ({ params }) => {
    const apolloClient = initializeApollo();

    await apolloClient.query<PostQuery>({
        query: PostDocument,
        variables: {
            id: params.id,
        },
    });

    return addApolloState(apolloClient, { props: {} });
};

export default Post;
