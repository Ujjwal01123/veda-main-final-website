/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "api.vedastructure.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "api.vedastructure.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
}

export default nextConfig
