/** @type {import('next').NextConfig} */
const nextConfig = {
  // УБРАЛИ output: 'export' - теперь динамические маршруты будут работать
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/B2B-marketplace-' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/B2B-marketplace-/' : '',
}

export default nextConfig
