import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Cart from './cart';
import { QUERY_CART } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Meta from './meta';

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
    displayName: 'cart',
  });

  useEffect(() => {
    if (window.localStorage.getItem('cartId')) {
      setCartId(window.localStorage.getItem('cartId'));
    }
  }, []);

  const cartItems = data?.cart?.lines.edges.length;

  return (
    <React.Fragment>
      <Meta />
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
