const url = process.env.NEXT_PUBLIC_CDN_BASE ? new URL(process.env.NEXT_PUBLIC_CDN_BASE) : null

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js'],
  },
  images: {
    domains: ['localhost'],
    remotePatterns: url
      ? [
          {
            protocol: url.protocol.replace(':', ''),
            hostname: url.hostname,
            pathname: `${url.pathname.replace(/\/+$/, '') || ''}/**`,
          },
        ]
      : undefined,
    formats: ['image/webp', 'image/avif'],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      bufferutil: false,
      'utf-8-validate': false,
    }
    return config
  },
}

module.exports = nextConfig 
