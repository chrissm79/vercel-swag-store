import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    products: { stale: 300, revalidate: 900, expire: 3600 }, // 5m / 15m / 1h
    stock: { stale: 30, revalidate: 60, expire: 300 }, // 30s / 60s / 5m
    categories: { stale: 300, revalidate: 900, expire: 3600 }, // 5m / 15m / 1h
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256],
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
