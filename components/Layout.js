import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Blisstronics' : 'Blisstronics'}</title>
        <meta name="description" content="Blisstronics e-commerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className=" flex justify-between items-center h-12 shadow-md px-4">
            <Link href="/">
              <a className=" text-lg font-bold ">Blisstronics</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className=" px-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className=" px-2">Login</a>
              </Link>
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
