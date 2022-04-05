import { useQuery } from '@apollo/client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/product-card';
import { PRODUCTS, QUERY_FEATURED_COLLECTION } from '../graphql/queries';
import client from '../lib/apollo';

Home.title = 'Home';

export default function Home({ data, featured }: any) {
  // const [slide, setSlide] = useState(1);
  // useEffect(() => {
  //   const totalProducts = featured.collection.products.edges.length;

  //   setTimeout(() => {
  //     if (slide == totalProducts) {
  //       setSlide(1);
  //     } else {
  //       setSlide(slide + 1);
  //     }
  //     console.log(totalProducts < slide, { totalProducts, slide });
  //   }, 5000);

  //   return () => clearTimeout();
  // }, [slide, featured]);
  return (
    <main className='bg-white'>
      <section className='grid md:grid-cols-2 container mx-auto py-16 md:py-5'>
        <div className='flex flex-col justify-center'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl text-dark font-sacramento leading-relaxed text-center'>
            Southern Bare Boutique
          </h1>
          <p className='text-center text-base md:text-xl px-5 max-w-lg mx-auto'>
            Small family business ran by the girls in the family. Our goal is to
            bring joy and happiness through clothes while making lasting
            memories.
          </p>
          <div className='mx-auto mt-5'>
            <Link href='/shop'>
              <a className='btn'>Shop Now</a>
            </Link>
          </div>
        </div>
        <div className='md:flex justify-center hidden'>
          {featured.collection.products.edges.map(
            ({ node }: any, i: number) => (
              <React.Fragment key={i}>
                {i === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className='relative h-full'
                  >
                    <Image
                      src={node.featuredImage.url}
                      height='545'
                      width='363'
                      alt='Product'
                      priority
                    />
                  </motion.div>
                )}
              </React.Fragment>
            )
          )}
        </div>
      </section>
      <section className='bg-dark py-10'>
        <div className='container mx-auto'>
          <h2 className='font-sacramento text-5xl md:text-7xl text-white text-center mb-3 md:mb-10'>
            Products
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
              <a className='btn'>View All</a>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: PRODUCTS,
    variables: { list: 12, featuredHeight: 640, featuredWidth: 560 },
  });
  const { data: featured } = await client.query({
    query: QUERY_FEATURED_COLLECTION,
  });
  return { props: { data, featured } };
}
