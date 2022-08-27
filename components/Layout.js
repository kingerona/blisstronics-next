import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Store } from '../utils/Store';

const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();

  const { state } = useContext(Store);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + ' - Blisstronics' : 'Blisstronics'}</title>
        <meta name="description" content="Blisstronics e-commerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className=" flex justify-between items-center h-12 shadow-md px-4">
            <Link href="/">
              <a className=" text-lg font-bold ">Blisstronics</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className=" px-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright &copy; 2022 Blisstronics
        </footer>
      </div>
    </>
  );
};

export default Layout;
