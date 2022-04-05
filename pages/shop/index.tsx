import ProductCard from '../../components/product-card';
import { PRODUCTS } from '../../graphql/queries';
import client from '../../lib/apollo';

interface ProductProps {
  edges: {
    node: {
      id: string;
      title: string;
      handle: string;
      priceRange: {
        minVariantPrice: {
          amount: number;
        };
      };
      featuredImage: {
        url: string;
      };
    };
  }[];
}

interface Props {
  products: ProductProps;
}

ShopPage.title = 'Shop';

export default function ShopPage({ products }: Props) {
  console.log({ products });
  return (
    <div className='bg-white'>
      <div className='container mx-auto pb-28'>
        <h1 className='text-5xl py-10 font-sacramento pt-16'>Shop</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-4'>
          {products.edges.map(({ node }) => (
            <ProductCard
              key={node.id}
              href={`/shop/${node.handle}`}
              image={node.featuredImage.url}
              name={node.title}
              price={node.priceRange.minVariantPrice.amount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: PRODUCTS,
    variables: { list: 5, featuredHeight: 320, featuredWidth: 260 },
  });
  const products = data.products;
  return { props: { products } };
}
