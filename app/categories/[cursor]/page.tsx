import PageContainer from "@components/page-container"
import ProductCard from "@components/product-card"
import { GET_COLLECTION } from "@queries"
import shopify from "@lib/shopify"

type Collection = {
  data: { collection: { title: string; products: { edges: any[] } } }
}

const getCollection = async (handle: string): Promise<Collection> => {
  const data = await shopify({ query: GET_COLLECTION }, { handle })
  return data.json()
}

export default async function SingleCollectionPage({
  params: { cursor },
}: any) {
  const {
    data: { collection },
  } = await getCollection(cursor)
  return (
    <PageContainer>
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
    </PageContainer>
  )
}
