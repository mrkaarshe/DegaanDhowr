/** @type {import('next').NextConfig} */
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: `${API.replace(/\/$/, "")}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;