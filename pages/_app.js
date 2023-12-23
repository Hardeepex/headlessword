import React from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Add any necessary logic for routing here

  return <Component {...pageProps} />;
}

export default MyApp;
