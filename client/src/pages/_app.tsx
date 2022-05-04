import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

// CSR
// const apolloClient = new ApolloClient({
//     uri: "http://localhost:4000/graphql",
//     cache: new InMemoryCache(),
//     credentials: "include",
// });

const MyApp = ({ Component, pageProps }: AppProps) => {
    // SSR
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </ApolloProvider>
    );
};

export default MyApp;
