import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo';
import Layout from '../components/layout';
import { NextComponentType } from 'next';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { title?: string };
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout title={Component.title}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
