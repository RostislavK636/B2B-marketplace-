/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/B2B-marketplace-',
  assetPrefix: '/B2B-marketplace-/',
  images: {
    unoptimized: true
  }
}

export default nextConfig
