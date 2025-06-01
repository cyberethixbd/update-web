/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yourdomain.com'], // এখানে আপনার ইমেজ ডোমেইনের নাম দিন, যেমন: 'images.example.com'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // সব হোস্টনেম অনুমোদন করতে চাইলে
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  env: {
    // এই লাইনটি ঠিকভাবে লিখতে হবে
    NEXTAUTH_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
  },
}

export default nextConfig;
