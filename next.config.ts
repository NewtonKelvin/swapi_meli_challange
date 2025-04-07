import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  modularizeImports: {
    "react-icons/?(((\\w*)?/?)*)": {
        transform: "@react-icons/all-files/{{ matches.[1] }}/{{ member }}",
        skipDefaultConversion: true
    }
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL
  }
};

export default nextConfig;
