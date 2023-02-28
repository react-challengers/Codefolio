/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require("next-remove-imports")();

const nextConfig = {
  images: {
    domains: [
      "xxfgrnzupwpguxifhwsq.supabase.co",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = removeImports({ ...nextConfig });
