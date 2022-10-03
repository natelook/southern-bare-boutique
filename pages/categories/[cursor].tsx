import { GetStaticPropsContext } from 'next'
import { ProductTypeNodeAndCursor } from '.'
import Layout from '../../components/layout'
import PageContainer from '../../components/page-container'
import ProductCard from '../../components/product-card'
import {
  GET_COLLECTION,
  GET_PRODUCT_TYPES,
  QUERY_BY_PRODUCT_TYPE,
} from '../../graphql/queries'
import client from '../../lib/apollo'
import { getCollections } from '../../lib/collections'
import { Collections, ProductProps } from '../../lib/types'

interface ProductTypePageProps {
  products: { node: ProductProps }[]
  name: string
  collections: Collections[]
}

export default function ProductTypePage({
  products,
  name,
  collections,
}: ProductTypePageProps) {
  return (
    <Layout collections={collections} title={`${name}`}>
      <PageContainer>
        <h1 className='text-2xl font-bold'>{name}</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {products &&
            products.map(({ node }) => (
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
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await getCollections()
  const types = data.map(({ node }) => ({
    params: { cursor: node.handle },
  }))

  return { paths: types, fallback: true }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const collections = await getCollections()
  const handle = params?.cursor as string

  const { data } = await client.query({
    query: GET_COLLECTION,
    variables: { handle },
  })

  return {
    props: {
      products: data.collection.products.edges,
      name: data.collection.title,
      collections,
    },
  }
}
