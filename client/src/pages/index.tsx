import {
    Box,
    Center,
    Button,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import {
    Post,
    PostsDocument,
    useLoginProfileQuery,
    usePostsQuery,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import SinglePost from "../components/SinglePost";
import { FC } from "react";
import { NetworkStatus } from "@apollo/client";
import CreatePostButton from "../components/CreatePostButton";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const LIMIT = 5;

const Index: FC = () => {
    const { data: loginProfileData, loading: useLoginProfileLoading } =
        useLoginProfileQuery();
    /**
     * Call in Cache Apollo not send request to server
     */
    const { data, loading, fetchMore, networkStatus } = usePostsQuery({
        variables: {
            limit: LIMIT,
        },
        /**
         * Component co render boi usePostsQuery hook, se rerender khi networkStatus thay doi,
         * => fetchMore: function recall query for get more data
         */
        notifyOnNetworkStatusChange: true,
    });

    const isLoadingMorePost = networkStatus === NetworkStatus.fetchMore;

    const loadMorePost = () =>
        fetchMore({
            variables: {
                limit: LIMIT,
                timeCompareCreatedAt: data?.posts?.timeCompareCreatedAt,
            },
        });

    return (
        <>
            {useLoginProfileLoading ? (
                <LoadingSpinner />
            ) : (
                <Navbar
                    data={loginProfileData}
                    useLoginProfileLoading={useLoginProfileLoading}
                />
            )}

            {loading && !isLoadingMorePost ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Center pt={20} pb={6} px={2} zIndex={"2"}>
                        <Box maxW={"900px"} w={"900px"}>
                            {loginProfileData?.loginProfile && (
                                <CreatePostButton
                                    userId={loginProfileData.loginProfile.id}
                                />
                            )}

                            {data.posts.totalPost !== 0 ? (
                                <>
                                    {data?.posts.paginatedPosts.map(
                                        (post: Post) => (
                                            <SinglePost
                                                key={post.id}
                                                post={post}
                                                loginProfileData={
                                                    loginProfileData
                                                }
                                            />
                                        )
                                    )}
                                </>
                            ) : (
                                <>
                                    <Box
                                        mt={4}
                                        w={"full"}
                                        bg={useColorModeValue(
                                            "white",
                                            "gray.900"
                                        )}
                                        boxShadow={"2xl"}
                                        rounded={"md"}
                                        p={6}
                                        overflow={"hidden"}
                                    >
                                        <Box textAlign="center" py={10} px={6}>
                                            <Heading
                                                display="inline-block"
                                                as="h2"
                                                size="2xl"
                                                bgGradient="linear(to-r, teal.400, teal.600)"
                                                backgroundClip="text"
                                            >
                                                DON'T HAVE ANY POST YET
                                            </Heading>
                                        </Box>
                                    </Box>
                                </>
                            )}
                            <Center>
                                {data.posts.hasMore && (
                                    <Button
                                        fontSize={"sm"}
                                        rounded={"full"}
                                        bg={"blue.400"}
                                        color={"white"}
                                        boxShadow={
                                            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                                        }
                                        _hover={{
                                            bg: "blue.500",
                                        }}
                                        _focus={{
                                            bg: "blue.500",
                                        }}
                                        isLoading={isLoadingMorePost}
                                        onClick={loadMorePost}
                                    >
                                        {isLoadingMorePost
                                            ? "Loading"
                                            : "Show more"}
                                    </Button>
                                )}
                            </Center>
                        </Box>
                    </Center>
                </>
            )}
        </>
    );
};

/**
 * getStaticProps => client save coockie sent to NextJS server
 * => NextJS don't know what cookie do => don't sent cookie to GraphQL
 * when SSR
 *
 * ===> Change getStaticProps => getServerSideProps
 *  */
export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const HEADERS = context.req.headers;

    const apolloClient = initializeApollo({
        headers: HEADERS,
    });

    await apolloClient.query({
        query: PostsDocument,
        variables: {
            limit: LIMIT,
        },
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default Index;
