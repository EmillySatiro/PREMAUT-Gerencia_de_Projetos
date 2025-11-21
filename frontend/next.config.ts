import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:3001/api/:path*',
      },
      {
        source: '/:path((?!_next|api|favicon.ico).*)',
        destination: '/pages/:path',
      },
    ];
  },
};

export default nextConfig;