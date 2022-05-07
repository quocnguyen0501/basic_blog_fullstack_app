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
import { PostsDocument, usePostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import SinglePost from "../components/SinglePost";
import { IPost } from "../types/props/IPost.props";
import { FC } from "react";

const Index: FC = () => {
    const { data, loading } = usePostsQuery();

    return (
        <>
            <Navbar />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Center pt={20} pb={6} px={2}>
                        <Box>
                            {data?.posts.map((post: IPost) => (
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
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default Index;
