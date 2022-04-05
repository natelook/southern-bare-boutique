import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Cart from './cart';
import { QUERY_CART } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Meta from './meta';
import { cartItemsVar } from '../lib/reactiveVars';
import Script from 'next/script';
import GoogleAnalytics from './ga';

interface LayoutProps {
  children: React.ReactChild;
}

export default function Layout({ children }: LayoutProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  const { data, loading } = useQuery(QUERY_CART, {
    variables: {
      cartId,
    },
  });

  useEffect(() => {
    if (window.localStorage.getItem('cartId')) {
      setCartId(window.localStorage.getItem('cartId'));
    }
  }, []);

  useEffect(() => {
    if (cartId && data) {
      cartItemsVar(data.cart.lines.edges);
    }
  }, [cartId, data]);

  const cartItems = data?.cart?.lines.edges.length;
  const reactiveVar = cartItemsVar();
  console.log({ reactiveVar, data });

  return (
    <React.Fragment>
      <Meta />
      <GoogleAnalytics />
      <Header openCart={() => setCartOpen(true)} cartItems={cartItems} />
      {children}

      <Cart
        isOpen={cartOpen}
        close={() => setCartOpen(false)}
        data={data}
        loading={loading}
        cartId={cartId}
      />

      <Footer />
    </React.Fragment>
  );
}
