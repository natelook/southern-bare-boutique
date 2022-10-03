import Layout from '../../components/layout'
import PageContainer from '../../components/page-container'
import ProductCard from '../../components/product-card'
import { PRODUCTS } from '../../graphql/queries'
import client from '../../lib/apollo'
import { getCollections } from '../../lib/collections'
import { Collections } from '../../lib/types'

interface ProductProps {
  edges: {
    node: {
      id: string
      title: string
      handle: string
      priceRange: {
        minVariantPrice: {
          amount: number
        }
      }
      featuredImage: {
        url: string
      }
    }
  }[]
}

interface Props {
  products: ProductProps
  collections: Collections[]
}

ShopPage.title = 'Shop'

export default function ShopPage({ products, collections }: Props) {
  return (
    <Layout collections={collections} title='All Products'>
      <PageContainer>
        <div className='container mx-auto pb-28'>
          <h1 className='text-5xl py-10 font-sacramento pt-16'>All Products</h1>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-4'>
            {products.edges.map(({ node }) => (
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
      </PageContainer>
    </Layout>
  )
}

export async function getStaticProps() {
  const collections = await getCollections()
  const { data } = await client.query({
    query: PRODUCTS,
    variables: { list: 20, featuredHeight: 320, featuredWidth: 260 },
  })
  const products = data.products
  return { props: { products, collections }, revalidate: 20 }
}
