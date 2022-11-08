"use client"

import { Fragment, useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import classNames from "classnames"
import ProductHead from "./head"
import ProductImages from "./images"
import ProductDetails from "./details"
import { useMutation } from "@tanstack/react-query"
import {
  ADD_TO_CART,
  CREATE_CART,
  SIMPLE_CREATE_CART,
} from "@lib/graphql/queries"
import { useAtom } from "jotai"
import { cartIdAtom, itemsInCartAtom } from "@components/cart/state"
import store from "@lib/store"

export interface ProductProps {
  title: string
  price: number
  featuredImage: {
    id: string
    url: string
    height: number
    width: number
    altText?: string
  }
  images?: {
    node: {
      url: string
      id: string
      alt: string
    }
  }[]
  sizes: {
    node: {
      id: string
      title: string
      currentlyNotInStock: boolean
    }
  }[]
  description?: string
  id: string
  tags?: string[]
}

const addToCart = async ({
  itemId,
  cartId,
}: {
  itemId: string
  cartId: string | null
}) => {
  if (cartId) return await store.request(ADD_TO_CART, { itemId, cartId })
  return await store.request(CREATE_CART, { itemId, cartId })
}

export default function Product({
  title,
  price,
  featuredImage,
  images,
  sizes,
  description,
  tags,
}: ProductProps) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [preorderItem, setPreorderItem] = useState(false)
  const [cartId, setCartId] = useAtom(cartIdAtom)
  const [itemsInCart, setItemsInCart] = useAtom(itemsInCartAtom)

  const mutation = useMutation(addToCart, {
    onSuccess: (data) => {
      setAddedToCart(true)
      if (data.cartCreate) {
        localStorage.setItem("cart", JSON.stringify(data.cartCreate.cart.id))
        setCartId(data.cartCreate.cart.id)
        setItemsInCart(1)
        return
      }

      setItemsInCart(data.cartLinesAdd.cart.lines.edges.length)
    },
  })

  useEffect(() => {
    if (addedToCart) {
      setTimeout(() => {
        setAddedToCart(false)
      }, 5000)
    }
  }, [addedToCart])

  useEffect(() => {
    if (tags) {
      const findPreorder = tags.find((tag) => tag.toLowerCase() === "preorder")
      findPreorder && setPreorderItem(true)
    }
  }, [tags])

  // const { data: relatedProducts, loading } = useQuery(PRODUCTS, {
  //   variables: { list: 4, featuredHeight: 640, featuredWidth: 560 },
  // })

  // const [createCart] = useMutation(CREATE_CART)
  // const [addToCart] = useMutation(ADD_TO_CART, {
  //   refetchQueries: [QUERY_CART],
  // })

  return (
    <Fragment>
      <div className="bg-white">
        <main className="pt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <ProductHead price={price} title={title} />
            <ProductImages images={images} title={title} />
            <div className="mt-8 lg:col-span-5">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-8">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="flex gap-3 sm:grid-cols-5">
                      {sizes &&
                        sizes.map(({ node }) => (
                          <RadioGroup.Option
                            key={node.id}
                            value={node.id}
                            className={({ active, checked }) =>
                              classNames(
                                !node.currentlyNotInStock
                                  ? "cursor-pointer focus:outline-none"
                                  : "opacity-25 cursor-not-allowed",
                                active ? "ring-2 ring-offset-2 ring-blue" : "",
                                checked
                                  ? "bg-blue border-transparent text-white hover:bg-blue"
                                  : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 w-full"
                              )
                            }
                            disabled={node.currentlyNotInStock}
                          >
                            <RadioGroup.Label as="p">
                              {node.title}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  onClick={() =>
                    selectedSize &&
                    mutation.mutate({ itemId: selectedSize, cartId })
                  }
                  className="mt-8 w-full bg-blue border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white"
                >
                  {!addedToCart
                    ? !preorderItem
                      ? "Add to cart"
                      : "Preorder"
                    : "Added To Cart!"}
                </button>
              </form>

              {/* Product details */}
              <ProductDetails description={description} />
            </div>
          </div>
          {/* Related products */}
          <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
            <h2
              id="related-heading"
              className="text-lg font-medium text-gray-900"
            >
              Other Products
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {/* {!loading &&
                relatedProducts &&
                relatedProducts.products.edges.map(({ node }: any) => (
                  <ProductCard
                    key={node.id}
                    image={node.featuredImage?.url}
                    altText={node.imageAlt}
                    name={node.title}
                    price={node.priceRange.minVariantPrice.amount}
                    href={node.handle}
                  />
                ))} */}
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  )
}
