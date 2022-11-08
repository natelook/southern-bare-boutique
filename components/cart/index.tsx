"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import Link from "next/link"
import { AiOutlineClose } from "react-icons/ai"
import { cartIdAtom, itemsInCartAtom } from "./state"
import { useAtom } from "jotai"
import CartItem from "./item"
import { getCartItems } from "@lib/requests"

interface CartProps {
  isOpen: boolean
  close: () => void
  loading: boolean
  data: any
  cartId: string | null
  innerHeight: number | null
}

export default function Cart({
  isOpen = false,
  close,
  innerHeight,
}: CartProps) {
  const [cartId] = useAtom(cartIdAtom)
  const [itemsInCart, setItemsInCart] = useAtom(itemsInCartAtom)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cartId", cartId],
    queryFn: () => getCartItems(cartId),
    onSuccess: (data) => {
      setItemsInCart(data.data.cart.lines.edges.length)
    },
    refetchInterval: 1000,
  })
  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      exit={{ x: 500 }}
      transition={{ duration: 0.2, bounce: 0 }}
      className="w-screen md:w-96 fixed right-0 bg-white top-0 py-5 drop-shadow-xl z-50"
      style={{ height: `${innerHeight}px` }}
    >
      <div className="overflow-scroll h-full pb-5">
        <div className="flex justify-between border-b border-gray-200 pb-3 px-3">
          <h1 className="uppercase font-bold text-2xl">Cart</h1>
          <button className="text-3xl block" onClick={close}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="mt-10 space-y-5 px-5">
          {!isLoading &&
          data?.data &&
          data?.data?.cart?.lines?.edges.length !== 0 ? (
            data?.data?.cart?.lines?.edges.map(({ node }: any) => (
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
                refetch={() => refetch()}
              />
            ))
          ) : (
            <p>
              No items in the cart.{" "}
              <Link href="/shop" passHref>
                <span className="text-blue block mt-3" onClick={close}>
                  Shop now!
                </span>
              </Link>
            </p>
          )}
        </div>
      </div>
      {data?.data?.cart?.lines?.edges.length !== 0 && (
        <div className="absolute bottom-0 w-full">
          <a
            className="bg-blue text-white w-full py-4 uppercase tracking-wider block text-center"
            href={data?.data?.cart?.checkoutUrl}
          >
            Checkout
          </a>
        </div>
      )}
    </motion.div>
  )
}
