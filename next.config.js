/** @type {import("next").NextConfig} */
module.exports = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  experimental: {
    urlImports: ["https://cdn.skypack.dev/"]
  },
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    domains: [
      "avatars.githubusercontent.com", // github avatar
      "icongr.am"
    ]
  }
};
