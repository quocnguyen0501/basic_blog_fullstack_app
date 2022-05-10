import Image from "next/image";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { Post, PostsDocument, usePostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import SinglePost from "../components/SinglePost";
import { FC } from "react";
import { NetworkStatus } from "@apollo/client";

const LIMIT = 5;

const Index: FC = () => {
    /**
     * Call in Cache Apollo not send request to server
     */
    const { data, loading, error, fetchMore, networkStatus } = usePostsQuery({
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
            <Navbar />
            {loading && !isLoadingMorePost ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Center pt={20} pb={6} px={2}>
                        <Box maxW={"900px"}>
                            {data?.posts.paginatedPosts.map((post: Post) => (
                                <SinglePost key={post.id} post={post} />
                            ))}
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
                                        {isLoadingMorePost ? 'Loading' : 'Show more'}
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

export const getStaticProps = async () => {
    const apolloClient = initializeApollo();

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
