module.exports = {
  experimental: { esmExternals: true },
  reactStrictMode: true,
  pageExtensions: ['js', 'mjs', 'jsx', 'mdx'],
  devIndicators: {
    buildActivity: false
  },
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'icongr.am', // icongr.am
      'avatars.githubusercontent.com', // icongr.am
      'pbs.twimg.com' // Twitter Profile Picture
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      });
    }

    return config;
  }
};
