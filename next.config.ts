// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ez a sor a Turbopack javítás
  turbopack: {},
};

export default withNextIntl(nextConfig);
