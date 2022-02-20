/** @type {import("next").NextConfig} */
module.exports = {
  swcMinify: true,
  compiler: {
    removeConsole: true
  },
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    domains: [
      "avatars.githubusercontent.com", // github avatar
      "icongr.am"
    ]
  },
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: "preact/compat",
  //       "react-dom/test-utils": "preact/test-utils",
  //       "react-dom": "preact/compat"
  //     });
  //   }
  //   return config;
  // }
};
