import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // @ts-ignore
  link: new createHttpLink({
    uri: `${process.env.SHOPIFY_URL}/api/2022-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_API_KEY,
      Accept: 'application/graphql',
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
