// lib/apolloClient.js
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({uri: "http://localhost:4000"}),
    cache: new InMemoryCache(),
  });
}
