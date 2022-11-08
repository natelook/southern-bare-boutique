const shopify = async (
  query: { query?: string; mutation?: string },
  variables?: { [name: string]: any },
  options?: any
) => {
  return await fetch(`${process.env.SHOPIFY_URL}/api/2022-01/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...query, variables }),
    ...options,
  })
}

export default shopify
