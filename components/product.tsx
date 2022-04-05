import { Fragment, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import classNames from '../lib/classNames';
import {
  ADD_TO_CART,
  CREATE_CART,
  PRODUCTS,
  QUERY_CART,
} from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import ProductCard from './product-card';
import { AnimatePresence, motion } from 'framer-motion';
import { cartItemsVar } from '../lib/reactiveVars';
import client from '../lib/apollo';

const product = {
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
};

interface ProductProps {
  title: string;
  price: number;
  featuredImage: {
    id: string;
    url: string;
    height: number;
    width: number;
    altText?: string;
  };
  sizes: {
    node: {
      id: string;
      title: string;
      currentlyNotInStock: boolean;
    };
  }[];
  description?: string;
  id: string;
}

export default function Product({
  title,
  price,
  featuredImage,
  sizes,
  description,
}: ProductProps) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (addedToCart) {
      setTimeout(() => {
        setAddedToCart(false);
      }, 5000);
    }
  }, [addedToCart]);

  const { data: relatedProducts, loading } = useQuery(PRODUCTS, {
    variables: { list: 4, featuredHeight: 640, featuredWidth: 560 },
  });

  const [createCart] = useMutation(CREATE_CART);
  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [QUERY_CART],
  });

  const add = async () => {
    const cartId = window.localStorage.getItem('cartId');
    console.log(cartId);
    if (!selectedSize) return;

    if (!cartId) {
      // Create new cart
      const { data: cartCreation } = await createCart({
        variables: { itemId: selectedSize },
      });
      window.localStorage.setItem('cartId', cartCreation.cartCreate.cart.id);
    } else {
      console.log('add to existing cart');
      // Add to currently stored cart
      const { data: addedToCart } = await addToCart({
        variables: { itemId: selectedSize, cartId },
      });
    }
    setAddedToCart(true);
  };

  return (
    <Fragment>
      <div className='bg-white'>
        <main className='pt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8'>
            <div className='lg:col-start-8 lg:col-span-5'>
              <div className='flex justify-between'>
                <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
                <p className='text-xl font-medium text-gray-900'>
                  ${Number(price).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Image gallery */}
            <div className='mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3'>
              <h2 className='sr-only'>Images</h2>
              <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
                <div className='lg:col-span-2 lg:row-span-2'>
                  {featuredImage && (
                    <Image
                      width={featuredImage.width}
                      height={featuredImage.height}
                      src={featuredImage.url}
                      alt={featuredImage.altText}
                      priority
                    />
                  )}
                </div>
              </div>
            </div>

            <div className='mt-8 lg:col-span-5'>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className='mt-8'>
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className='mt-2'
                  >
                    <RadioGroup.Label className='sr-only'>
                      Choose a size
                    </RadioGroup.Label>
                    <div className='flex gap-3 sm:grid-cols-5'>
                      {sizes &&
                        sizes.map(({ node }) => (
                          <RadioGroup.Option
                            key={node.id}
                            value={node.id}
                            className={({ active, checked }) =>
                              classNames(
                                !node.currentlyNotInStock
                                  ? 'cursor-pointer focus:outline-none'
                                  : 'opacity-25 cursor-not-allowed',
                                active ? 'ring-2 ring-offset-2 ring-blue' : '',
                                checked
                                  ? 'bg-blue border-transparent text-white hover:bg-blue'
                                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                              )
                            }
                            disabled={node.currentlyNotInStock}
                          >
                            <RadioGroup.Label as='p'>
                              {node.title}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type='submit'
                  onClick={add}
                  className='mt-8 w-full bg-blue border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white'
                >
                  {!addedToCart ? 'Add to cart' : 'Added To Cart!'}
                </button>
              </form>

              {/* Product details */}
              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-900'>
                  Description
                </h2>

                <div
                  className='mt-4 prose prose-sm text-gray-500'
                  dangerouslySetInnerHTML={{
                    __html: description ? description : '<p>No description</p>',
                  }}
                />
              </div>

              <div className='mt-8 border-t border-gray-200 pt-8'>
                <h2 className='text-sm font-medium text-gray-900'>
                  Fabric &amp; Care
                </h2>

                <div className='mt-4 prose prose-sm text-gray-500'>
                  <ul role='list'>
                    {product.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
            </div>
          </div>
          {/* Related products */}
          <section aria-labelledby='related-heading' className='mt-16 sm:mt-24'>
            <h2
              id='related-heading'
              className='text-lg font-medium text-gray-900'
            >
              Other Products
            </h2>

            <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
              {!loading &&
                relatedProducts &&
                relatedProducts.products.edges.map(({ node }: any) => (
                  <ProductCard
                    key={node.id}
                    image={node.featuredImage.url}
                    altText={node.imageAlt}
                    name={node.title}
                    price={node.priceRange.minVariantPrice.amount}
                    href='/shop'
                  />
                ))}
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  );
}
