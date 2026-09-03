/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@pets-care/types',
    '@pets-care/validation',
    '@pets-care/api-client',
    'lucide-react',
  ],
};

export default nextConfig;
