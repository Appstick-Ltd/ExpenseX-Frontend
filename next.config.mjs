/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['lucide-react', 'three', 'typewriter-effect'],
};

export default nextConfig;
