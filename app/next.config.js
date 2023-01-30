/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/socket-admin",
        destination: "https://admin.socket.io/#/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
