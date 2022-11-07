import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Cart from '../components/cart'
import { QUERY_CART } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import Meta from '../components/meta'
import { cartIdVar } from '../lib/reactiveVars'
import GoogleAnalytics from '../components/ga'
import classNames from 'classnames'
import { getCollections } from '../lib/collections'

interface LayoutProps {
  children: React.ReactChild
  title?: string
}

export default async function Layout({ children, title }: LayoutProps) {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartId, setCartId] = useState<string | null>(null)

  const [innerHeight, setInnerHeight] = useState<null | number>(null)
  useEffect(() => {
    setInnerHeight(window.innerHeight)
  }, [cartOpen])

  const { data, loading, refetch } = useQuery(QUERY_CART, {
    variables: {
      cartId: cartIdVar(),
    },
  })

  useEffect(() => {
    if (window.localStorage.getItem('cartId')) {
      setCartId(window.localStorage.getItem('cartId'))
      cartIdVar(window.localStorage.getItem('cartId'))
    }
  }, [])

  useEffect(() => {
    if (cartIdVar()) {
      refetch()
    }
  }, [refetch])

  const collections = await getCollections()

  // useEffect(() => {
  //   function getCartId() {
  //     console.log(localStorage.getItem('cartId'));
  //     console.log('refetching', cartIdVar());
  //     setCartId(cartIdVar());
  //     refetch();
  //   }

  //   window.addEventListener('', getCartId);

  //   return () => window.removeEventListener('storage', getCartId);
  // }, [refetch]);

  const cartItems = data?.cart?.lines.edges.length

  return (
    <React.Fragment>
      <Meta title={title} />
      <GoogleAnalytics />
      <div
        className={classNames({ 'overflow-hidden': cartOpen })}
        style={{ height: `${innerHeight}px` }}
      >
        <Header
          openCart={() => setCartOpen(true)}
          cartItems={cartItems}
          collections={collections}
        />
        <div className='bg-white'>{children}</div>
        <Footer />
      </div>
      <Cart
        isOpen={cartOpen}
        close={() => setCartOpen(false)}
        data={data}
        loading={loading}
        cartId={cartId}
        innerHeight={innerHeight}
      />
    </React.Fragment>
  )
}
