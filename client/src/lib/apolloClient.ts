import { Post, PaginatedPost } from "./../generated/graphql";
import { useMemo } from "react";
import {
    ApolloClient,
    from,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
// import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { IncomingHttpHeaders } from "http";
import fetch from "isomorphic-unfetch";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";
import { Errors } from "../types/enum/Errors.enum";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface IApolloStateProps {
    [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

// Global handle error for login
const errorLink = onError((errors) => {
    if (
        errors.graphQLErrors &&
        errors.graphQLErrors[0].extensions?.code === Errors.UNAUTHENTICATED &&
        errors.response
    ) {
        errors.response.errors = undefined;
        Router.replace("/login");
    }
});

function createApolloClient(headers: IncomingHttpHeaders | null = null) {
    // Config for Next SSR send cookie when send Request to Server
    const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                "Access-Control-Allow-Origin": "*",
                // here we pass the cookie along for each request
                Cookie: headers?.cookie ?? "",
            },
        });
    };

    const httpLink = new HttpLink({
        uri:
            process.env.NODE_ENV === "production"
                ? "https://qn-blog-fullstack.herokuapp.com/graphql"
                : "http://localhost:4000/graphql", // Server URL (must be absolute)
        credentials: "include", // Additional fetch() options like `credentials` or `headers`
        fetch: enhancedFetch,
    });

    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache({
            /**
             * typePolicies: use for change the cache base on (base on: dựa trên) field in Type
             * Type: Query and Mutation
             */
            typePolicies: {
                Query: {
                    fields: {
                        posts: {
                            keyArgs: false,
                            /**
                             * merge will call when Post receive new datas
                             * @param existing recent data in apollo cache
                             * @param incoming new data cache will receive
                             */
                            merge(
                                existing: PaginatedPost,
                                incoming: PaginatedPost
                            ) {
                                let paginatedPosts: Post[] = [];

                                if (existing && existing.paginatedPosts) {
                                    paginatedPosts = paginatedPosts.concat(
                                        existing.paginatedPosts
                                    );
                                }
                                if (incoming && incoming.paginatedPosts) {
                                    paginatedPosts = paginatedPosts.concat(
                                        incoming.paginatedPosts
                                    );
                                }

                                const newPaginatedPostsCacheAfterMerge: PaginatedPost =
                                    {
                                        totalPost: incoming.totalPost,
                                        hasMore: incoming.hasMore,
                                        timeCompareCreatedAt:
                                            incoming.timeCompareCreatedAt,
                                        paginatedPosts: paginatedPosts,
                                    };

                                return newPaginatedPostsCacheAfterMerge;
                            },
                        },
                    },
                },
            },
        }),
    });
}

export const initializeApollo = (
    options: {
        headers?: IncomingHttpHeaders | null;
        initialState?: NormalizedCacheObject | null;
    } = {
        headers: null,
        initialState: null,
    }
) => {
    const _apolloClient = apolloClient ?? createApolloClient(options.headers);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (options.initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
        const data = merge(existingCache, options.initialState, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
};

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: {
        props: IApolloStateProps;
    }
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: IApolloStateProps) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(
        () => initializeApollo({ initialState: state }),
        [state]
    );
    return store;
}
