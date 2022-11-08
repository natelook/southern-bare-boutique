import { GraphQLClient } from "graphql-request"

const store = new GraphQLClient(
  `${process.env.SHOPIFY_URL}/api/2022-01/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_API_KEY!,
    },
  }
)

export default store
