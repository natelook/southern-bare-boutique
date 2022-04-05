import { GetStaticPropsContext } from 'next';
import { ProductTypeNodeAndCursor } from '.';
import PageContainer from '../../components/page-container';

import ProductCard from '../../components/product-card';
import {
  GET_PRODUCT_TYPES,
  QUERY_BY_PRODUCT_TYPE,
} from '../../graphql/queries';
import client from '../../lib/apollo';

interface ProductTypePageProps {
  products: { node: ProductProps }[];
  name: string;
}

interface ProductProps {
  title: string;
  price: number;
  handle: string;
  featuredImage: {
    id: string;
    url: string;
    height: number;
    width: number;
    altText?: string;
  };
  sizes: {
    node: {
      id: string;
      title: string;
      currentlyNotInStock: boolean;
    };
  }[];
  description?: string;
  id: string;
  priceRange: { minVariantPrice: { amount: number } };
}

export default function ProductTypePage({
  products,
  name,
}: ProductTypePageProps) {
  return (
    <PageContainer>
      <h1 className='text-2xl font-bold'>{name}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {products &&
          products.map(({ node }) => (
            <ProductCard
              key={node.id}
              name={node.title}
              image={node.featuredImage?.url}
              href={node.handle}
              price={node.priceRange.minVariantPrice.amount}
            />
          ))}
      </div>
    </PageContainer>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PRODUCT_TYPES,
  });

  const types = data.productTypes.edges.map(
    (edge: ProductTypeNodeAndCursor) => ({
      params: { cursor: edge.cursor },
    })
  );

  return { paths: types, fallback: true };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const cursor = context?.params?.cursor;

  const { data: types } = await client.query({
    query: GET_PRODUCT_TYPES,
  });

  console.log({ cursor });

  const typeName = types.productTypes.edges.find(
    (edge: ProductTypeNodeAndCursor) => edge.cursor == cursor
  );

  const { data } = await client.query({
    query: QUERY_BY_PRODUCT_TYPE,
    variables: { query: typeName.node },
  });

  return { props: { products: data.products.edges, name: typeName.node } };
}
