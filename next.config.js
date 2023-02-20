/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
