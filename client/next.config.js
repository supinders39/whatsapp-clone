/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 7379737,
    NEXT_PUBLIC_ZEGO_SERVER_SECRET: "26c2c5aebfc0f40f271c7ce1835898ce" 

  },
  images: {
    domains: ["localhost", "whatsapp.sarao.dev", "whatsappapi.sarao.dev", "sarao.dev"]
  }
};

module.exports = nextConfig;
