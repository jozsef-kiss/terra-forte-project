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
  // BIZTONSÁGI FEJLÉCEK
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
            value: "SAMEORIGIN", // Megvédi az oldalt attól, hogy mások beágyazzák (Clickjacking)
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Megakadályozza, hogy a böngésző "kitalálja" a fájltípust (MIME-sniffing)
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin", // Adatvédelmi beállítás
          },
        ],
      },
    ];
  },
};

export default nextConfig;
