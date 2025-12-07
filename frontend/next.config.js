// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   output: 'standalone', // Критически важно для Docker
//   poweredByHeader: false,
//   images: {
//     unoptimized: true, // Для простоты, можно изменить позже
//   },
//   eslint: {
//     ignoreDuringBuilds: true, // Игнорировать ошибки ESLint при сборке
//   },
//   typescript: {
//     ignoreBuildErrors: true, // Игнорировать ошибки TypeScript при сборке
//   }
// }


// module.exports = nextConfig

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ]
  }
}

module.exports = nextConfig