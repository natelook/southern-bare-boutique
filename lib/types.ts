export interface InCartItem {
  node: {
    id: string
    merchandise: {
      id: string
      title: string
      priceV2: { amount: string }
      product: {
        title: string
        handle: string
        availableForSale: boolean
        priceRange: {
          maxVariantPrice: {
            amount: 20
          }
        }
        featuredImage: {
          url: string
          altText: string
        }
      }
    }
  }
}

export interface Collections {
  node: { id: string; title: string; handle: string }
}
export interface ProductProps {
  title: string
  price: number
  handle: string
  featuredImage: {
    id: string
    url: string
    height: number
    width: number
    altText?: string
  }
  sizes: {
    node: {
      id: string
      title: string
      currentlyNotInStock: boolean
    }
  }[]
  description?: string
  id: string
  priceRange: { minVariantPrice: { amount: number } }
}

export interface CartItemProps {
  item: {
    id: string
    image: string
    title: string
    quanity: number
    price: number
    size: "XS" | "SM" | "MD" | "LG" | "XL"
  }

  refetch: () => void
}
