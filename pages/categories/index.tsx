import Link from 'next/link'
import Layout from '../../components/layout'
import PageContainer from '../../components/page-container'
import { GET_PRODUCT_TYPES } from '../../graphql/queries'
import client from '../../lib/apollo'
import { getCollections } from '../../lib/collections'
import { Collections } from '../../lib/types'

interface ProductTypePageProps {
  collections: Collections[]
}

export default function ProductTypePage({ collections }: ProductTypePageProps) {
  return (
    <Layout title='Categories' collections={collections}>
      <PageContainer>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-gray-900 font-sacramento mb-5'>
            Categories
          </h1>
          <ul className='text-black text-xl space-y-5'>
            {collections.map(({ node }) => (
              <li key={node.id}>
                <Link href={`/categories/${node.handle}`}>
                  <a>{node.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </Layout>
  )
}

export async function getStaticProps() {
  const collections = await getCollections()

  return { props: { collections }, revalidate: 20 }
}
