// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dhptrkobw/image/upload/**",
        search: "",
      },
    ],
  },
};

// module.exports = nextConfig;
export default nextConfig;
