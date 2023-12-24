const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig & {
  typescript?: boolean;
}}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
