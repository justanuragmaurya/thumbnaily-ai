const nextConfig = {
  allowedDevOrigins: [
    'http://165.22.214.246',
    'https://www.thumbnaily.in',
    'https://thumbnaily.in',
    'https://7d23-2a09-bac5-3f07-1a96-00-2a6-29.ngrok-free.app',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnaily-storage.s3.ap-south-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.iconscout.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '**'
      }
      
    ],
  },
};

export default nextConfig;