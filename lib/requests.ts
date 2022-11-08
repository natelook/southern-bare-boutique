import type { Collection, Collections, ProductProps } from "./types"
import {
  COLLECTIONS,
  GET_COLLECTION,
  GET_SINGLE_PRODUCT,
  PRODUCTS,
  QUERY_CART,
  REMOVE_ITEM_FROM_CART,
} from "@lib/graphql/queries"
import store from "./store"

export const getCollections = async (): Promise<{
  collections: { edges: Collections[] }
}> => await store.request(COLLECTIONS)

export const getProduct = async (handle: string): Promise<{ product: any }> =>
  await store.request(GET_SINGLE_PRODUCT, { handle })

export const getProducts = async (): Promise<{
  products: { edges: ProductProps[] }
}> =>
  await store.request(PRODUCTS, {
    list: 8,
    featuredHeight: 640,
    featuredWidth: 560,
  })

export const getAllProducts = async (): Promise<{
  products: { edges: ProductProps[] }
}> => await store.request(PRODUCTS, { list: 24 })

export const getCollection = async (handle: string): Promise<Collection> =>
  await store.request(GET_COLLECTION, { handle })

export const getCartItems = async (cartId: string | null) => {
  if (!cartId) return null
  return await store.request(QUERY_CART, { cartId })
}

export const removeFromCart = async ({
  cartId,
  itemsId,
}: {
  cartId: string | null
  itemsId: string
}) => {
  if (!cartId) return
  return await store.request(REMOVE_ITEM_FROM_CART, { cartId, itemsId })
}
