// lib/apolloClient.js
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({uri: process.env.NEXT_PUBLIC_API_URL}),
    cache: new InMemoryCache(),
  });
}
