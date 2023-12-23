import React from 'react';
import { useRouter } from 'next/router';
import SEO from '../components/SEO/SEO';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const router = useRouter();

  router.push('/new-page');

  return <Component {...pageProps} />;
}

export default MyApp;
