import Container from "@components/ui/container"
import ProductCard from "@components/product/card"
import { getCollection } from "@lib/requests"

export default async function SingleCollectionPage({
  params: { cursor },
}: any) {
  const { collection } = await getCollection(cursor)
  return (
    <Container>
      <h1 className="text-2xl font-bold">{collection.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {collection.products &&
          collection.products.edges.map(({ node }) => (
            <ProductCard
              key={node.id}
              name={node.title}
              image={node.featuredImage?.url}
              href={node.handle}
              price={node.priceRange.minVariantPrice.amount}
            />
          ))}
      </div>
    </Container>
  )
}
