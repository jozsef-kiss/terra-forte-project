import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tailwindcss.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "flagcdn.com" }, // A zászlókhoz
    ],
  },
  // BIZTONSÁGI FEJLÉCEK (Security Headers)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // Megvédi az oldalt a "Clickjacking"-től (mások nem ágyazhatják be iframe-be)
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Megakadályozza a fájltípusokkal való visszaélést
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin", // Adatvédelmi beállítás a hivatkozásokhoz
          },
        ],
      },
    ];
  },
};

export default nextConfig;
