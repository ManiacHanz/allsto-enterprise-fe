/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: [
    "@mui/material",
    "@mui/system",
    "@mui/icons-material", // If @mui/icons-material is being used
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
