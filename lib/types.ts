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
  featuredImage: {
    id: string
    url: string
    height: number
    width: number
    altText?: string
  }
  images?: {
    node: {
      url: string
      id: string
      alt: string
    }
  }[]
  sizes: {
    node: {
      availableForSale: boolean
      id: string
      title: string
      currentlyNotInStock: boolean
    }
  }[]
  description?: string
  id: string
  tags?: string[]
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

export type Collection = {
  collection: { title: string; products: { edges: any[] } }
}
