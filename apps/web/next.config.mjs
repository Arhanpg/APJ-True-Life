/** @type {import('next').NextConfig} */
const nextConfig = {
  // During CI the environment variables are placeholders.
  // TypeScript errors and ESLint warnings are caught in a separate
  // dedicated type-check job so the build job stays fast.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
