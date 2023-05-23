/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.mm.bing.net',
          },
        ],
      },
}

module.exports = nextConfig
