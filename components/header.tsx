import { ShoppingBagIcon } from '@heroicons/react/outline'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { Collections } from '../lib/types'

const fakeCategories = [
  { name: 'Basics', slug: '/basics' },
  { name: 'Tops', slug: '/tops' },
  { name: 'Dresses', slug: '/dresses' },
  { name: 'Sweaters', slug: '/sweaters' },
  { name: 'Bottoms', slug: '/bottoms' },
  { name: 'Denim', slug: '/denim' },
  { name: 'Sets', slug: '/sets' },
]

interface HeaderProps {
  cartItems: number
  openCart: () => void
  collections: Collections[]
}

export default function Header({
  cartItems,
  openCart,
  collections,
}: HeaderProps) {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false)
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', () => setCategoriesOpen(false))
  }, [router.events])
  return (
    <header className='bg-white border select-none'>
      <div className='flex justify-center items-center pt-4 pb-2'>
        <div>
          <div className='flex justify-center mb-3'>
            <Link href='/'>
              <a>
                <Image
                  src='/logo-black.svg'
                  height='42.5px'
                  width='300px'
                  alt='Southen Bare Boutique Logo'
                />
              </a>
            </Link>
          </div>
          <nav>
            <ul className='flex justify-center md:space-x-20 space-x-5 '>
              <li>
                <Link href='/'>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href='/about'>
                  <a>About</a>
                </Link>
              </li>
              <li
                className='flex space-x-1 items-center cursor-pointer relative'
                onClick={() =>
                  setCategoriesOpen(isCategoriesOpen ? false : true)
                }
              >
                <span>Shop</span>
                <BsChevronDown size='.75em' />
                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className='absolute top-8 -left-8 bg-white border px-8 pb-5 pt-4 border-gray-200 z-30 space-y-3'
                    >
                      {collections.map(({ node }) => (
                        <li key={node.handle}>
                          <Link href={`/categories/${node.handle}`}>
                            <a>{node.title}</a>
                          </Link>
                        </li>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li
                className='block h-6 w-6 relative text-gray-600'
                onClick={openCart}
              >
                <ShoppingBagIcon />
                {cartItems !== null && cartItems > 0 && (
                  <span className='text-white absolute -top-1 -right-2 bg-blue w-4 h-4 md:h-5 md:w-5 flex items-center justify-center rounded-full md:-top-2 md:-right-2 text-xs'>
                    {cartItems}
                  </span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
