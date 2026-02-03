/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'http://192.168.8.11:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;