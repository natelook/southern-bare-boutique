import Product from "@components/product"
import { getProduct } from "@lib/requests"

export default async function ProductPage({ params: { handle } }: any) {
  const { product } = await getProduct(handle)

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
