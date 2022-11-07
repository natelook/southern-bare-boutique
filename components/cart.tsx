import { useMutation } from '@apollo/client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'
import { REMOVE_ITEM_FROM_CART } from '../graphql/queries'

interface CartProps {
  isOpen: boolean
  close: () => void
  loading: boolean
  data: any
  cartId: string | null
  innerHeight: number | null
}

export default function Cart({
  isOpen,
  close,
  loading,
  data,
  cartId,
  innerHeight,
}: CartProps) {
  return (
    <motion.div
      animate={{ x: isOpen ? 0 : 500 }}
      transition={{ duration: 0.2, bounce: 0 }}
      className='w-screen md:w-96 fixed right-0 bg-white top-0 py-5 drop-shadow-xl z-50'
      style={{ height: `${innerHeight}px` }}
    >
      <div className='overflow-scroll h-full pb-5'>
        <div className='flex justify-between border-b border-gray-200 pb-3 px-3'>
          <h1 className='uppercase font-bold text-2xl'>Cart</h1>
          <button className='text-3xl block' onClick={close}>
            <AiOutlineClose />
          </button>
        </div>
        <div className='mt-10 space-y-5 px-5'>
          {!loading && data && data?.cart?.lines?.edges.length !== 0 ? (
            data?.cart?.lines?.edges.map(({ node }: any) => (
              <CartItem
                key={node.merchandise.id}
                item={{
                  id: node.id,
                  image: node.merchandise.product.featuredImage.url,
                  title: node.merchandise.product.title,
                  price:
                    node.merchandise.product.priceRange.maxVariantPrice.amount,
                  quanity: 1,
                  size: node.merchandise.title,
                }}
                cartId={cartId}
              />
            ))
          ) : (
            <p>
              No items in the cart.{' '}
              <Link href='/shop'>
                <a className='text-blue block mt-3' onClick={close}>
                  Shop now!
                </a>
              </Link>
            </p>
          )}
        </div>
      </div>
      {data?.cart?.lines?.edges.length !== 0 && (
        <div className='absolute bottom-0 w-full'>
          <a
            className='bg-blue text-white w-full py-4 uppercase tracking-wider block text-center'
            href={data?.cart?.checkoutUrl}
          >
            Checkout
          </a>
        </div>
      )}
    </motion.div>
  )
}

interface CartItemProps {
  item: {
    id: string
    image: string
    title: string
    quanity: number
    price: number
    size: 'XS' | 'SM' | 'MD' | 'LG' | 'XL'
  }
  remove?: () => void
  cartId: string | null
}

function getSizeName(size: string) {
  return size === 'XS'
    ? 'Extra Small'
    : size === 'SM'
    ? 'Small'
    : size === 'MD'
    ? 'Medium'
    : size === 'LG'
    ? 'Large'
    : size === 'XL'
    ? 'Extra Large'
    : ''
}

function CartItem({ item, cartId }: CartItemProps) {
  const { image, title, quanity, price, id, size } = item

  const longSizeName = getSizeName(size)
  const [removeFromCart] = useMutation(REMOVE_ITEM_FROM_CART)

  const remove = async () => {
    await removeFromCart({
      variables: { cartId, itemsId: id },
      refetchQueries: 'active',
    })
  }

  return (
    <div className='grid grid-cols-2 gap-x-5 border-b border-gray-200 last:border-b-0 pb-5'>
      <Image src={image} height='150px' width='150px' alt={title} />
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between'>
          <div>
            <h3 className='font-bold mb-0 leading-5'>{title}</h3>
            <span className='text-gray-700 uppercase text-sm'>
              {longSizeName}
            </span>
          </div>
          <div
            onClick={remove}
            className='cursor-pointer place-items-center flex text-red-500'
          >
            <FiTrash />
          </div>
        </div>
        <div className='flex justify-between'>
          <p>Quanity {quanity}</p>
          <p>${Number(price).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
