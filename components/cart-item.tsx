import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { InCartItem } from '../lib/types'

export default function CartItem({ item }: { item: InCartItem }) {
  return (
    <li className='flex py-6 sm:py-10'>
      <div className='flex-shrink-0'>
        <Image
          height='150px'
          width='150px'
          src={item.node.merchandise.product.featuredImage.url}
          alt={item.node.merchandise.product.featuredImage.altText}
          className='h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48'
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-sm'>
                <Link href={item.node.merchandise.product.handle}>
                  <a className='font-medium text-gray-700 hover:text-gray-800'>
                    {item.node.merchandise.product.title}
                  </a>
                </Link>
              </h3>
            </div>
            <div className='mt-1 flex text-sm'>
              <p className='text-gray-500'>{item.node.merchandise.title}</p>
            </div>
            <p className='mt-1 text-sm font-medium text-gray-900'>
              ${item.node.merchandise.priceV2.amount}
            </p>
          </div>

          <div className='mt-4 sm:mt-0 sm:pr-9'>
            <label htmlFor={`quantity-${item.node.id}`} className='sr-only'>
              Quantity, {item.node.merchandise.product.title}
            </label>
            <select
              id={`quantity-${item.node.id}`}
              name={`quantity-${item.node.id}`}
              className='max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>

            <div className='absolute top-0 right-0'>
              <button
                type='button'
                className='-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Remove</span>
                <XIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>

        <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
          {item.node.merchandise.product.availableForSale ? (
            <CheckIcon
              className='h-5 w-5 flex-shrink-0 text-green-500'
              aria-hidden='true'
            />
          ) : (
            <ClockIcon
              className='h-5 w-5 flex-shrink-0 text-gray-300'
              aria-hidden='true'
            />
          )}
        </p>
      </div>
    </li>
  )
}
