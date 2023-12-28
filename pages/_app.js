import React from 'react';
import { useRouter } from 'next/router';
import SEO from '../components/SEO/SEO';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Replace with dynamic route here
dynamicRouteBasedOnStateOrProps();

  return <Component {...pageProps} />;
}

export default MyApp;
