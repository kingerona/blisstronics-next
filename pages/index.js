import axios from 'axios';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stockAmount < quantity) {
      return toast.error('Sorry, stock amount reached');
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });

    toast.success('Item added to cart');
  };

  return (
    <Layout title="Home">
      <div className="grid gri-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  await db.connect();
  const response = await Product.find({ isFeatured: true }).lean();
  const stringified = response.map(db.convertDocToObject);
  const final = stringified.map((product) => {
    product.variations.map(db.convertVariationToObject);
    return product;
  });
  await db.disconnect();

  return {
    props: {
      products: final,
    },
    revalidate: 10,
  };
};
