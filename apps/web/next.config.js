// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    'http://165.22.214.246',
    'http://thumbnaily.anuragmaurya.com',
    'https://thumbnaily.anuragmaurya.com'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnaily.s3.ap-south-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
