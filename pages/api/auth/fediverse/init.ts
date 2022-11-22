// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mastodon from 'lib/manager/MastodonManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const mas = await mastodon.getOauthClientSecret('https://ieji.de');
	res.status(200).json({ mas });
}
