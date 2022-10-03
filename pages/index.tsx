import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout'
import ProductCard from '../components/product-card'
import { PRODUCTS, QUERY_FEATURED_COLLECTION } from '../graphql/queries'
import client from '../lib/apollo'
import { getCollections } from '../lib/collections'

export default function Home({ data, featured, collections }: any) {
  return (
    <Layout title='Home' collections={collections}>
      <main className='bg-white'>
        <section className='container mx-auto py-10'>
          <div
            className='bg-header-image bg-center bg-cover rounded-lg flex justify-center items-center relative'
            style={{ height: '60vh' }}
          >
            <div className='relative z-20 text-center'>
              <div className='mb-5'>
                <h2 className='text-white text-5xl font-bold tracking-widest mb-1'>
                  Now Available Online
                </h2>
                <h3 className='text-lighter text-xl uppercase'>
                  Shop new items
                </h3>
              </div>
              <Link href='/categories'>
                <a className='bg-blue bg-opacity-80 text-xl text-white px-5 py-2 rounded-lg mx-auto hover:bg-opacity-100 duration-100'>
                  Shop Now
                </a>
              </Link>
            </div>
            <div className='bg-black bg-opacity-30 w-full h-full absolute z-10 rounded-lg' />
          </div>
        </section>
        <section className='bg-dark py-10'>
          <div className='container mx-auto'>
            <h2 className='font-sacramento text-5xl md:text-6xl text-white text-center mb-3 md:mb-10'>
              Newest Products
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 px-4'>
              {data?.products?.edges.map((product: any, i: number) => (
                <ProductCard
                  key={i}
                  image={product.node.featuredImage?.url}
                  href={product.node.handle}
                  name={product.node.title}
                  price={product.node.priceRange.minVariantPrice.amount}
                  light
                />
              ))}
            </div>
            <div className='mx-auto mt-5 flex justify-center pt-5'>
              <Link href='/shop'>
                <a className='bg-blue bg-opacity-80 text-xl text-white px-5 py-2 rounded-lg mx-auto hover:bg-opacity-100 duration-100'>
                  View All
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const collections = await getCollections()
  const { data } = await client.query({
    query: PRODUCTS,
    variables: { list: 12, featuredHeight: 640, featuredWidth: 560 },
  })
  const { data: featured } = await client.query({
    query: QUERY_FEATURED_COLLECTION,
  })
  return { props: { data, featured, collections } }
}
