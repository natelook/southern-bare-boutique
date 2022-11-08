import Product from "@components/product"
import shopify from "@lib/shopify"
import { GET_SINGLE_PRODUCT } from "@queries"

const getProduct = async (handle: string): Promise<{ data: any }> => {
  const data = await shopify({ query: GET_SINGLE_PRODUCT }, { handle })
  return data.json()
}

export default async function ProductPage({ params: { handle } }: any) {
  const {
    data: { product },
  } = await getProduct(handle)

  return (
    <Product
      title={product?.title}
      price={product?.priceRange?.maxVariantPrice?.amount}
      featuredImage={product?.featuredImage}
      images={product?.images.edges}
      sizes={product?.variants?.edges}
      description={product?.descriptionHtml}
      tags={product?.tags}
      id={product?.id}
    />
  )
}
