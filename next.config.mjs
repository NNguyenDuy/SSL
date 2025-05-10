/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    compress: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['gsap'],
    },
};

export default nextConfig;
