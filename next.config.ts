import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is a single page. Send old multi-page URLs to the matching section.
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/services/:slug", destination: "/#services", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/service-area", destination: "/#service-area", permanent: true },
      { source: "/reviews", destination: "/#reviews", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
