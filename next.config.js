module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};
