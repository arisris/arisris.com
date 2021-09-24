module.exports = {
  experimental: { esmExternals: true },
  reactStrictMode: true,
  pageExtensions: ['js', 'mjs', 'jsx'],
  devIndicators: {
    buildActivity: false
  },
  images: {
    domains: [
      'avatars.githubusercontent.com' // github avatar
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
