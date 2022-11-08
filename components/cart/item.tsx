"use client"

import { useMutation } from "@tanstack/react-query"
import graphql from "@lib/graphql"
import { CartItemProps } from "@lib/types"
import { getSizeName } from "@lib/utils"
import { REMOVE_ITEM_FROM_CART } from "@queries"
import Image from "next/image"
import { FiTrash } from "react-icons/fi"
import { cartIdAtom } from "@components/cart-state"
import { useAtom } from "jotai"

const removeFromCart = async ({
  cartId,
  itemsId,
}: {
  cartId: string | null
  itemsId: string
}) => {
  if (!cartId) return
  return await graphql.request(REMOVE_ITEM_FROM_CART, { cartId, itemsId })
}

export default function CartItem({ item, refetch }: CartItemProps) {
  const { image, title, quanity, price, id, size } = item
  const [cartId] = useAtom(cartIdAtom)

  const mutation = useMutation(removeFromCart, {
    onSuccess: () => {
      refetch()
    },
  })

  const longSizeName = getSizeName(size)

  return (
    <div className="grid grid-cols-2 gap-x-5 border-b border-gray-200 last:border-b-0 pb-5">
      <Image src={image} height={150} width={150} alt={title} />
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold mb-0 leading-5">{title}</h3>
            <span className="text-gray-700 uppercase text-sm">
              {longSizeName}
            </span>
          </div>
          <div
            onClick={() =>
              mutation.mutate({
                itemsId: id,
                cartId,
              })
            }
            className="cursor-pointer place-items-center flex text-red-500"
          >
            <FiTrash />
          </div>
        </div>
        <div className="flex justify-between">
          <p>Quanity {quanity}</p>
          <p>${Number(price).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
