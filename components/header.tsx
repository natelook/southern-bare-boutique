import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/outline';
import { BsChevronDown } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_TYPES } from '../graphql/queries';
import { ProductTypeNodeAndCursor } from '../pages/categories';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

interface HeaderProps {
  openCart: () => void;
  cartItems: number | null;
}

export default function Header({ openCart, cartItems }: HeaderProps) {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const { data, loading } = useQuery(GET_PRODUCT_TYPES);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => setCategoriesOpen(false));
  }, [router.events]);

  return (
    <header className='bg-light drop-shadow-lg text-white relative z-40'>
      <div className='relative'>
        <div className='container mx-auto flex items-center justify-between py-2 px-2'>
          <div className='-mb-0.5'>
            <Link href='/'>
              <a>
                <Image
                  src='/logo.svg'
                  height='39px'
                  width='195px'
                  alt='Southern Bare Boutique Logo'
                />
              </a>
            </Link>
          </div>
          <ul className='flex items-center space-x-1 md:space-x-4 text-sm md:text-base'>
            <li className='flex flex-col-reverse md:flex-row space-x-5'>
              <div className='font-bold uppercase'>
                <span
                  className='flex items-center md:space-x-1'
                  onClick={() => setCategoriesOpen(!isCategoriesOpen)}
                >
                  <span>Categories</span>{' '}
                  <span
                    className={classNames('transition', {
                      'rotate-180': isCategoriesOpen,
                    })}
                  >
                    <BsChevronDown />
                  </span>
                </span>
              </div>
              <div className='font-bold uppercase'>
                <Link href='/shop'>
                  <a>Shop</a>
                </Link>
              </div>
            </li>
            <li className='block h-6 w-6 relative' onClick={openCart}>
              <ShoppingBagIcon />
              {cartItems !== null && cartItems > 0 && (
                <span className='absolute -top-1 -right-1 bg-blue w-4 h-4 md:h-5 md:w-5 flex items-center justify-center rounded-full md:-top-2 md:-right-3 text-xs'>
                  {cartItems}
                </span>
              )}
            </li>
          </ul>
        </div>
        <AnimatePresence>
          {isCategoriesOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='bg-white text-black py-4 w-full absolute left-0 z-40'
            >
              {!loading && Array.isArray(data?.productTypes?.edges) && (
                <ul className='flex justify-center space-x-5'>
                  {data.productTypes.edges.map(
                    (edge: ProductTypeNodeAndCursor) => (
                      <li key={edge.cursor}>
                        <Link href={`/categories/${edge.cursor}`}>
                          <a className='font-bold'>{edge.node}</a>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
