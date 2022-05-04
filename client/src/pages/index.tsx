import Navbar from "../components/Navbar";
import { PostsDocument, usePostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const Index = () => {
    const { data, loading } = usePostsQuery();

    return (
        <>
            <Navbar />
            <h1>HOME PAGE</h1>
            {loading ? (
                "LOADING..."
            ) : (
                <>
                    <ul>
                        {data?.posts.map((post) => (
                            <li>{post.title}</li>
                        ))}
                    </ul>
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
