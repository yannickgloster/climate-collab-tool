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
      {
        source: "/survey",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSdlN9gs_-h1DDN6CUcBruhcBTC8LeB5fGddJ93GuY2WyQBt4Q/viewform?usp=sf_link",
      },
    ];
  },
  i18n: {
    locales: ["en", "fr", "pseudo"],
    defaultLocale: "en",
  },
  experimental: {
    swcPlugins: [
      [
        "@lingui/swc-plugin",
        {
          // Optional
          // Unlike the JS version this option must be passed as object only.
          // Docs https://lingui.dev/ref/conf#runtimeconfigmodule
          // runtimeModules: {
          //   i18n: ["@lingui/core", "i18n"],
          //   trans: ["@lingui/react", "Trans"],
          // },
        },
      ],
    ],
  },
};

module.exports = nextConfig;
