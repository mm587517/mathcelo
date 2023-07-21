import nextMDX from '@next/mdx';
import remarkMath from 'remark-math';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  images: {
    domains: ['github.com', 'lh3.googleusercontent.com'],
  },
};

export default withMDX(nextConfig);
