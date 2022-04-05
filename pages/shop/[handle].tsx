import { GetStaticPropsContext } from 'next';
import Product from '../../components/product';
import { GET_PRODUCT_PATHS, GET_SINGLE_PRODUCT } from '../../graphql/queries';
import client from '../../lib/apollo';

ProductPage.title = 'Shop';

export default function ProductPage({ product }: any) {
  return (
    <Product
      title={product?.title}
      price={product?.priceRange?.maxVariantPrice?.amount}
      featuredImage={product?.featuredImage}
      sizes={product?.variants?.edges}
      description={product?.descriptionHtml}
      id={product?.id}
    />
  );
}

export async function getStaticPaths() {
  const fetchProducts = await client.query({
    query: GET_PRODUCT_PATHS,
  });

  const products = fetchProducts.data.products.edges.map(
    (item: { node: { handle: string } }) => ({
      params: { handle: `${item.node.handle}` },
    })
  );

  return { paths: products, fallback: true };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { data } = await client.query({
    query: GET_SINGLE_PRODUCT,
    variables: { handle: context?.params?.handle },
  });

  return { props: { product: data.product } };
}
