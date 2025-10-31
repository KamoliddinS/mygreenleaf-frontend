/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ✅ enables the app/ folder router
  },
  reactCompiler: true, // keep your setting
};

export default nextConfig;