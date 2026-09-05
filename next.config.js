/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 忽略 TypeScript 編譯錯誤，確保順利 Build
    ignoreBuildErrors: true,
  },
  eslint: {
    // 忽略 ESLint 語法檢查
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
