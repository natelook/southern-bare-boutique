import { gql } from "graphql-request"

export const PRODUCTS = gql`
  query PRODUCTS(
    $list: Int!
    $featuredHeight: Int = 900
    $featuredWidth: Int = 600
  ) {
    products(first: $list) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url(
              transform: {
                crop: TOP
                maxWidth: $featuredWidth
                maxHeight: $featuredHeight
              }
            )
          }
        }
      }
    }
  }
`

export const GET_SINGLE_PRODUCT = gql`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      tags
      featuredImage {
        url
        height
        width
        id
      }
      images(first: 5) {
        edges {
          node {
            id
            url
            height
            width
            altText
          }
        }
      }
      seo {
        title
        description
      }
      priceRange {
        maxVariantPrice {
          amount
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
          }
        }
      }
      descriptionHtml
    }
  }
`

export const GET_PRODUCT_PATHS = gql`
  query getProductPaths {
    products(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
  }
`

export const GET_RELATED_PRODUCTS = gql`
  query getRelatedProducts($id: ID!) {
    productRecommendations(productId: $id) {
      title
      id
    }
  }
`

export const QUERY_CART = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                }
                product {
                  availableForSale
                  title
                  handle
                  priceRange {
                    maxVariantPrice {
                      amount
                    }
                  }
                  featuredImage {
                    url(transform: { crop: TOP, maxWidth: 500, maxHeight: 500 })
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const SIMPLE_CREATE_CART = gql`
  mutation {
    cartCreate {
      cart {
        id
      }
    }
  }
`

export const CREATE_CART = gql`
  mutation ($itemId: ID!) {
    cartCreate(input: { lines: [{ quantity: 1, merchandiseId: $itemId }] }) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    priceRange {
                      maxVariantPrice {
                        amount
                      }
                    }
                    featuredImage {
                      url(
                        transform: {
                          crop: CENTER
                          maxWidth: 150
                          maxHeight: 150
                        }
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ADD_TO_CART = `
  mutation ($cartId: ID!, $itemId: ID!) {
    cartLinesAdd(
      cartId: $cartId
      lines: { merchandiseId: $itemId, quantity: 1 }
    ) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    priceRange {
                      maxVariantPrice {
                        amount
                      }
                    }
                    featuredImage {
                      url(
                        transform: {
                          crop: CENTER
                          maxWidth: 150
                          maxHeight: 150
                        }
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const REMOVE_ITEM_FROM_CART = gql`
  mutation cartItemsRemove($cartId: ID!, $itemsId: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $itemsId) {
      cart {
        id
      }
    }
  }
`

export const GET_PRODUCT_TYPES = gql`
  {
    productTypes(first: 5) {
      edges {
        node
        cursor
      }
    }
  }
`

export const QUERY_BY_PRODUCT_TYPE = gql`
  query queryByProductType($query: String!) {
    products(query: $query, first: 15) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url(transform: { crop: TOP, maxWidth: 600, maxHeight: 600 })
          }
        }
      }
    }
  }
`

export const QUERY_FEATURED_COLLECTION = gql`
  {
    collection(handle: "featured") {
      title
      products(first: 5) {
        edges {
          node {
            handle
            title
            featuredImage {
              url(transform: { crop: TOP, maxHeight: 545, maxWidth: 363 })
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  }
`

export const COLLECTIONS = gql`
  query getCollections {
    collections(first: 20) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
`

export const GET_COLLECTION = gql`
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      title
      handle
      products(first: 20) {
        edges {
          node {
            handle
            title
            featuredImage {
              url(transform: { maxWidth: 560, maxHeight: 640, crop: CENTER })
            }
            id
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  }
`
