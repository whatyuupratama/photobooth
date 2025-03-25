import type { NextConfig } from 'next';
import allowedDomains from '@/lib/allowedDomains';
/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: allowedDomains,
  },
};

export default NextConfig;
