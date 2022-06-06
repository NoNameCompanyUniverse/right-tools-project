/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
//
// module.exports = nextConfig

module.exports = {
    env: {
        baseURL: process.env.NEXTAUTH_URL,
        fetchURL: process.env.FETCH_URL,
    },
    reactStrictMode: true,
}