import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  modularizeImports: {
    "react-icons/?(((\\w*)?/?)*)": {
      transform: "@react-icons/all-files/{{ matches.[1] }}/{{ member }}",
      skipDefaultConversion: true
    }
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
