import Link from 'next/link'
import PageContainer from '../../components/page-container'
import { GET_PRODUCT_TYPES } from '../../graphql/queries'
import client from '../../lib/apollo'

export interface ProductTypeNodeAndCursor {
  node: string
  cursor: string
}

interface ProductTypePageProps {
  types: {
    edges: ProductTypeNodeAndCursor[]
  }
}

export default function ProductTypePage({ types }: ProductTypePageProps) {
  return (
    <PageContainer>
      <h1 className='text-2xl font-bold text-gray-900'>Products</h1>
      <ul className='text-black'>
        {types.edges.map(({ node, cursor }) => (
          <li key={cursor}>
            <Link href={`/categories/${cursor}`}>
              <a>{node}</a>
            </Link>
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PRODUCT_TYPES,
  })

  return { props: { types: data.productTypes }, revalidate: 20 }
}
