/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ✅ enables the app/ folder router
  },
  images: {
    domains: ['s3.mygreenleaf.uz']
  },
  reactCompiler: true, // keep your setting
};

export default nextConfig;