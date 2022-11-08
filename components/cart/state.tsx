"use client"

import React, { useEffect } from "react"
import { atom, useAtom } from "jotai"
import { getCartItems } from "@lib/requests"
import { useQuery } from "@tanstack/react-query"

export const cartIdAtom = atom<string | null>(null)
export const itemsInCartAtom = atom<number>(0)

interface Props {
  children: React.ReactNode
}

export default function CartState({ children }: Props) {
  const [cartId, setCartId] = useAtom(cartIdAtom)
  const [itemsInCart, setItemsInCart] = useAtom(itemsInCartAtom)
  useEffect(() => {
    if (cartId) return
    const localCart = localStorage.getItem("cart")
    if (!localCart) return
    const cartData = JSON.parse(localCart)
    if (cartData) {
      setCartId(cartData)
    }
  }, [setCartId, cartId])

  useQuery({
    queryKey: ["cartId", cartId],
    queryFn: () => getCartItems(cartId),
    onSuccess: (data) => {
      if (!data) return
      setItemsInCart(data.cart.lines.edges.length)
    },
  })

  return <div>{children}</div>
}
