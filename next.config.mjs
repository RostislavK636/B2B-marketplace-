/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/B2B-marketplace-',
  assetPrefix: '/B2B-marketplace-/',
}

export default nextConfig
