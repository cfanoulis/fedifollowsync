const PUBLIC_URL = process.env.VERCEL ? `https://${process.env.VERCEL_URL}` ?? 'https://ffsync.fanoulis.dev' : 'http://localhost:3000';
const GIT_COMMIT = process.env.VERCEL ? process.env.VERCEL_GIT_COMMIT_SHA!.slice(0, 6) : 'devdevdev';

// eslint-disable-next-line import/no-anonymous-default-export
export default { PUBLIC_URL, GIT_COMMIT };
