/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure transpilation for packages if needed
  transpilePackages: ['lucide-react', 'three', 'typewriter-effect'],
};

export default nextConfig;
