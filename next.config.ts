/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 静的エクスポートではミドルウェアが使用できないので無効化
  // または特定のページだけを静的に生成
  images: {
    unoptimized: true, // 静的エクスポートでは画像の最適化が使用できないため
  },
}

module.exports = nextConfig