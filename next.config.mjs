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

  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, { canvas: "canvas" }];

    return config;
  },
};

// module.exports = nextConfig;
export default nextConfig;
