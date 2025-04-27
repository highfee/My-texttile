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
};

// module.exports = nextConfig;
export default nextConfig;
