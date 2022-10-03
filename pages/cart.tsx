/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useQuery } from '@apollo/client'
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
import CartItem from '../components/cart-item'
import { QUERY_CART } from '../graphql/queries'
import { cartIdVar } from '../lib/reactiveVars'
import { InCartItem } from '../lib/types'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
]

export default function CartPage() {
  const { data, loading, refetch } = useQuery(QUERY_CART, {
    variables: {
      cartId:
        'Z2lkOi8vc2hvcGlmeS9DYXJ0LzRlZjQ0YTUyMTMyODY5YzVjNmYyOGM2YWUxNTJhMDNl',
    },
  })
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Cart
        </h1>
        {!loading && data.cart ? (
          <form className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
            <section aria-labelledby='cart-heading' className='lg:col-span-7'>
              <h2 id='cart-heading' className='sr-only'>
                Items in your shopping cart
              </h2>

              <ul
                role='list'
                className='divide-y divide-gray-200 border-t border-b border-gray-200'
              >
                {data.cart.lines.edges.map((item: InCartItem, i: number) => (
                  <CartItem item={item} key={i} />
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby='summary-heading'
              className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'
            >
              <h2
                id='summary-heading'
                className='text-lg font-medium text-gray-900'
              >
                Order summary
              </h2>

              <dl className='mt-6 space-y-4'>
                <div className='flex items-center justify-between'>
                  <dt className='text-sm text-gray-600'>Subtotal</dt>
                  <dd className='text-sm font-medium text-gray-900'>$99.00</dd>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                  <dt className='flex items-center text-sm text-gray-600'>
                    <span>Shipping estimate</span>
                    <a
                      href='#'
                      className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500'
                    >
                      <span className='sr-only'>
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </a>
                  </dt>
                  <dd className='text-sm font-medium text-gray-900'>$5.00</dd>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                  <dt className='flex text-sm text-gray-600'>
                    <span>Tax estimate</span>
                    <a
                      href='#'
                      className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500'
                    >
                      <span className='sr-only'>
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </a>
                  </dt>
                  <dd className='text-sm font-medium text-gray-900'>$8.32</dd>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                  <dt className='text-base font-medium text-gray-900'>
                    Order total
                  </dt>
                  <dd className='text-base font-medium text-gray-900'>
                    $112.32
                  </dd>
                </div>
              </dl>

              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full rounded-md border border-transparent bg-blue hover:bg-blue-dark py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-lighter focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
        ) : (
          <p>No Items</p>
        )}
      </div>
    </div>
  )
}
