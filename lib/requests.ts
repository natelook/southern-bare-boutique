import type { Collections } from "./types"
import { COLLECTIONS } from "@queries"
import shopify from "./shopify"

export const getCollections = async (): Promise<{
  data: { collections: { edges: Collections[] } }
}> => {
  const data = await shopify({ query: COLLECTIONS })
  return await data.json()
}
