/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  images: {
    remotePatterns: [],
  },
  // Serve output folder as static files
  async rewrites() {
    return [
      {
        source: '/output/:path*',
        destination: '/api/image/:path*',
      },
    ];
  },
};

export default nextConfig;
