"use client"

import React, { useEffect } from "react"
import { atom, useAtom } from "jotai"

export const cartIdAtom = atom<string | null>(null)
export const itemsInCartAtom = atom<number>(0)

interface Props {
  children: React.ReactNode
}

export default function CartState({ children }: Props) {
  const [cartId, setCartId] = useAtom(cartIdAtom)
  useEffect(() => {
    if (cartId) return
    const localCart = localStorage.getItem("cart")
    if (!localCart) return
    const cartData = JSON.parse(localCart)
    if (cartData) {
      setCartId(cartData)
    }
  }, [setCartId, cartId])
  return <div>{children}</div>
}
