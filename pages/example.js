import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Hero,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
} from '../components';
import { getNextStaticProps } from '@faustwp/core';

interface PageProps {
  title: string;
}

export default function Page({ title }: PageProps): React.ReactElement {
  const router = useRouter();
  const { data } = useQuery(Page.query, {
    variables: { ...Page.variables(), ...router.query },
  });

  const { title: siteTitle, description: siteDescription } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={title} />
          <div className="text-center">
            <p>This page is utilizing the Next.js File based routes.</p>
            <code>pages/example.js</code>
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {Page, props: {title: 'File Page Example'}});
}
