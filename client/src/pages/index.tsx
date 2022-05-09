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
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { Post, PostsDocument, usePostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import SinglePost from "../components/SinglePost";
import { FC } from "react";

const LIMIT = 5;

const Index: FC = () => {
    const { data, loading } = usePostsQuery({
        variables: {
            limit: LIMIT,
        },
    });

    return (
        <>
            <Navbar />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Center pt={20} pb={6} px={2}>
                        <Box maxW={"900px"}>
                            {data?.posts.paginatedPosts.map((post: Post) => (
                                <SinglePost key={post.id} post={post} />
                            ))}
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
