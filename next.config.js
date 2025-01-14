/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/arpesh28/wordswap.ai",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/arpesh-gadekars-projects/wordswap-ai",
        permanent: false,
      },
    ];
  },
};
