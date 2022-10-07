import { GetStaticPropsContext } from 'next'
import Layout from '../../components/layout'
import Product from '../../components/product'
import { GET_PRODUCT_PATHS, GET_SINGLE_PRODUCT } from '../../graphql/queries'
import client from '../../lib/apollo'
import { getCollections } from '../../lib/collections'

export default function ProductPage({ product, collections }: any) {
  return (
    <Layout title={product?.title} collections={collections}>
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
    </Layout>
  )
}

export async function getStaticPaths() {
  const fetchProducts = await client.query({
    query: GET_PRODUCT_PATHS,
  })

  const products = fetchProducts.data.products.edges.map(
    (item: { node: { handle: string } }) => ({
      params: { handle: `${item.node.handle}` },
    }),
  )

  return { paths: products, fallback: true }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const collections = await getCollections()
  const { data } = await client.query({
    query: GET_SINGLE_PRODUCT,
    variables: { handle: context?.params?.handle },
  })

  return { props: { product: data.product, collections }, revalidate: 20 }
}
