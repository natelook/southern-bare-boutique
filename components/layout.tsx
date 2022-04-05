import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Cart from './cart';
import { QUERY_CART } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Meta from './meta';
import { cartIdVar } from '../lib/reactiveVars';
import GoogleAnalytics from './ga';
import classNames from 'classnames';

interface LayoutProps {
  children: React.ReactChild;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  const { data, loading, refetch } = useQuery(QUERY_CART, {
    variables: {
      cartId: cartIdVar(),
    },
  });

  useEffect(() => {
    if (window.localStorage.getItem('cartId')) {
      setCartId(window.localStorage.getItem('cartId'));
      cartIdVar(window.localStorage.getItem('cartId'));
    }
  }, []);

  useEffect(() => {
    if (cartIdVar()) {
      console.log('fired', cartIdVar());
      refetch();
    }
  }, [refetch]);

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

  const cartItems = data?.cart?.lines.edges.length;

  return (
    <React.Fragment>
      <Meta title={title} />
      <GoogleAnalytics />
      <div className={classNames({ 'h-screen overflow-hidden': cartOpen })}>
        <Header openCart={() => setCartOpen(true)} cartItems={cartItems} />
        {children}
        <Footer />
      </div>
      <Cart
        isOpen={cartOpen}
        close={() => setCartOpen(false)}
        data={data}
        loading={loading}
        cartId={cartId}
      />
    </React.Fragment>
  );
}
