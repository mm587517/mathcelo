/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    output: 'export',
  },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
