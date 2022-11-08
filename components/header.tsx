"use client"

import type { Collections } from "../lib/types"
import { ShoppingBagIcon } from "@heroicons/react/outline"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import Cart from "./cart"
import CartIcon from "./cart/icon"

interface HeaderProps {
  collections: Collections[]
}

export default function Header({ collections }: HeaderProps) {
  // console.log({ isOpen })
  // const collections = await getCollections()

  const [cartOpen, setCartOpen] = useState(false)
  const [isCategoriesOpen, setCategoriesOpen] = useState(false)
  const [cartId, setCartId] = useState<string | null>(null)
  const [innerHeight, setInnerHeight] = useState<null | number>(null)

  useEffect(() => {
    setInnerHeight(window.innerHeight)
  }, [cartOpen])

  useEffect(() => {
    if (window.localStorage.getItem("cartId")) {
      setCartId(window.localStorage.getItem("cartId"))
      // cartIdVar(window.localStorage.getItem("cartId"))
    }
  }, [])
  return (
    <React.Fragment>
      <header className="bg-white border select-none">
        <div className="flex justify-center items-center pt-4 pb-2">
          <div>
            <div className="flex justify-center mb-3">
              <Link href="/" passHref>
                <Image
                  src="/logo-black.svg"
                  height={42.5}
                  width={300}
                  alt="Southen Bare Boutique Logo"
                />
              </Link>
            </div>
            <nav>
              <ul className="flex justify-center md:space-x-20 space-x-5 ">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li
                  className="flex space-x-1 items-center cursor-pointer relative"
                  onClick={() =>
                    setCategoriesOpen(isCategoriesOpen ? false : true)
                  }
                >
                  <span>Shop</span>
                  <BsChevronDown size=".75em" />
                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-8 -left-8 bg-white border px-8 pb-5 pt-4 border-gray-200 z-30 space-y-3"
                      >
                        {collections &&
                          collections.map(({ node }) => (
                            <li key={node.handle}>
                              <Link
                                href={`/categories/${node.handle}`}
                                passHref
                              >
                                <span>{node.title}</span>
                              </Link>
                            </li>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                <li
                  className="block h-6 w-6 relative text-gray-600"
                  onClick={() => setCartOpen(true)}
                >
                  <CartIcon />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {cartOpen && (
          <Cart
            isOpen={cartOpen}
            close={() => setCartOpen(false)}
            data={null}
            loading={false}
            cartId={null}
            innerHeight={innerHeight}
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  )
}
