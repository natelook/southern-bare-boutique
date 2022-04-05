import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '../components/product-card';
import { PRODUCTS } from '../graphql/queries';
import client from '../lib/apollo';

Home.title = 'Home';

export default function Home({ data }: any) {
  // const { data } = useQuery(PRODUCTS, {
  //   variables: { list: 12, featuredHeight: 640, featuredWidth: 560 },
  // });
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
          <div className='drop-shadow-lg'>
            <Image
              src='/dev/image1.png'
              height='545.5'
              width='363.5'
              alt='Product'
            />
          </div>
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
                image={product.node.featuredImage.url}
                href={`/shop/${product.node.handle}`}
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
  return { props: { data } };
}
