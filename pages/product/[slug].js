import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

const ProductScreen = ({ product }) => {
  console.log(product._id);
  const { state, dispatch } = useContext(Store);

  if (!product)
    return <Layout title="Product not found">Product not Found!</Layout>;

  const addToCartHandler = async () => {
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
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to products</Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-lg font-bold">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>{`${product.rating} (${product.reviewCount} reviews)`}</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>৳ {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.stockAmount > 0 ? 'In stock' : 'Out of stock'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: 'product-1' } },
      { params: { slug: 'product-2' } },
      { params: { slug: 'product-3' } },
      { params: { slug: 'product-4' } },
      { params: { slug: 'product-5' } },
      { params: { slug: 'product-6' } },
      { params: { slug: 'product-7' } },
      { params: { slug: 'product-8' } },
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const stringified = product && db.convertDocToObject(product);
  const variations =
    stringified && stringified.variations?.map(db.convertVariationToObject);
  await db.disconnect();

  return {
    props: {
      product: product ? { ...stringified, variations } : null,
    },
    revalidate: 10,
  };
};
