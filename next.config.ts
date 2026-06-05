import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js
  transpilePackages: ['three'],
  allowedDevOrigins: ['192.168.11.5'],
};


export default nextConfig;
