/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["10.57.17.190"],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
}

export default nextConfig
