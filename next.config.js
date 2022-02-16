/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    domains: [
      "avatars.githubusercontent.com" // github avatar
    ]
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat"
      });
    }
    return config;
  }
};
