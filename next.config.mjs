/** @type {import('next').NextConfig} */
const nextConfig = {
  // УБРАТЬ output: 'export' - это главная проблема!
  trailingSlash: false,
  images: {
    unoptimized: true
  }
  // Убрать basePath и assetPrefix для Vercel
}

export default nextConfig
