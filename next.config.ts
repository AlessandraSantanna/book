/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "pt.wikipedia.org",
      "upload.wikimedia.org",
      "books.google.com",
      "m.media-amazon.com",
      "livrariacultura.vteximg.com.br",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pt.wikipedia.org",
        pathname: "/wiki/**",
      },
    ],
  },
};

export default nextConfig;
