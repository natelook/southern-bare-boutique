import Layout from '../components/layout'
import { getCollections } from '../lib/collections'
import { Collections } from '../lib/types'

interface AboutPageProps {
  collections: Collections[]
}

export default function AboutPage({ collections }: AboutPageProps) {
  return (
    <Layout title='About' collections={collections}>
      <div className='container max-w-xl mx-auto py-20'>
        <h1 className='text-6xl mb-10 font-sacramento'>About Us</h1>
        <p className='text-lg'>
          Small family business ran by the girls in the family. Our goal is to
          bring joy and happiness through clothes while making lasting memories.
        </p>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const collections = await getCollections()
  return { props: { collections }, revalidate: 20 }
}
