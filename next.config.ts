import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // 'three' の import を aframe 内部の three.js に一本化する
      'three': 'aframe/src/lib/three.js',
    },
  },
};

export default nextConfig;
