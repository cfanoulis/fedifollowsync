/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				hostname: 'pbs.twimg.com',
				pathname: '/profile_images/**'
			}
		]
	}
};

module.exports = nextConfig;
