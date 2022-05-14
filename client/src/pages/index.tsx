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
    useDisclosure,
} from "@chakra-ui/react";
import { ImLink, ImImages } from "react-icons/im";
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
import { GetStaticProps } from "next";

export const LIMIT = 5;

const Index: FC = () => {
    const { data: loginProfileData, loading: useLoginProfileLoading } =
        useLoginProfileQuery();
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
            <Navbar
                data={loginProfileData}
                useLoginProfileLoading={useLoginProfileLoading}
            />
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

export const getStaticProps: GetStaticProps = async () => {
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
