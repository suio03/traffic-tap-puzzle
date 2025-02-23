/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https",
            },
            {
                hostname: "media.sprunkiincrediboxes.net",
                protocol: "https",
            }
        ]
    }
}

module.exports = nextConfig
