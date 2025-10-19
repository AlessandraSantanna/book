/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
  images: {
    domains: [
      "pt.wikipedia.org",        // ✅ necessário para a imagem que você usou
      "upload.wikimedia.org",    // outras imagens da Wikipédia
      "books.google.com",        // se usar imagens do Google Books
      'm.media-amazon.com', 'livrariacultura.vteximg.com.br'          // qualquer outro domínio que você use
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
