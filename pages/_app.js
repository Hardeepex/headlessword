import React, { ReactElement, FC } from 'react';
import SEO from '../components/SEO/SEO';
import { useRouter } from 'next/router';

interface MyAppProps {
  Component: FC;
  pageProps: Record<string, unknown>;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps }): ReactElement => {
  const router = useRouter();

  // Add any necessary logic for routing here
  // For example, to navigate to a new page, use router.push('/new-page')

  return <Component {...pageProps} />;
}

export default MyApp;
