import React from "react";
import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const GraphqlClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={GraphqlClient}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
