"use client"

import { itemsInCartAtom } from "@components/cart/state"
import { ShoppingBagIcon } from "@heroicons/react/outline"
import { useAtom } from "jotai"

export default function CartIcon() {
  const [itemsInCart] = useAtom(itemsInCartAtom)
  return (
    <div>
      <ShoppingBagIcon />
      {itemsInCart > 0 && (
        <span className="text-white absolute -top-1 -right-2 bg-blue w-4 h-4 md:h-5 md:w-5 flex items-center justify-center rounded-full md:-top-2 md:-right-2 text-xs">
          {itemsInCart}
        </span>
      )}
    </div>
  )
}
