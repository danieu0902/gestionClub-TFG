/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ciudaddelucena.es',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'icon-library.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
