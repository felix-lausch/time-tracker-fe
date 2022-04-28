/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    PORTAL_API_BASE_URL: process.env.API_BASE_URL
  }
}
