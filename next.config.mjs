/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.freepik.com",
      "geek-backend-api.geek.tools",
      "github.com",
      "geekstool.onrender.com",
      "geektools-resources.s3.us-west-2.amazonaws.com",
      "geektools-resources.s3.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
