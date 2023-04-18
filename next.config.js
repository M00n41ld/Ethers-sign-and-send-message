/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fastly.picsum.photos', 'preview.redd.it'], // Добавьте разрешенные хосты в этот массив
  },
}

module.exports = nextConfig
