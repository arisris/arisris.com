/** @type {import("next").NextConfig} */
module.exports = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
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
