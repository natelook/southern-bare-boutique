import Container from "@components/ui/container"
import ProductCard from "@components/product/card"
import { getAllProducts } from "@lib/requests"

export default async function ShopPage() {
  const {
    products: { edges: products },
  } = await getAllProducts()

  return (
    <Container>
      <div className="container mx-auto pb-28">
        <h1 className="text-5xl py-10 font-sacramento pt-16">All Products</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-4">
          {products.map(({ node }: any) => (
            <ProductCard
              key={node.id}
              href={node.handle}
              image={node.featuredImage?.url}
              name={node.title}
              price={node.priceRange.minVariantPrice.amount}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
