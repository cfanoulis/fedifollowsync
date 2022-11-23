// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MastodonManager from 'lib/manager/MastodonManager';
import { withSessionRoute } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!req.query.server || Array.isArray(req.query.server)) {
		const q = new URLSearchParams({
			error: 'no_homeserver'
		});
		return res.redirect(`/?error=no_server`);
	}

	const [, instance] = req.query.server.split('@'); // todo: regex

	// todo: validate that this is indeed a valid mastodon server:tm:
	req.session.mastodon = { instance };
	await req.session.save();

	const mastodon = await new MastodonManager(instance).getClientCredentials();
	return res.redirect(mastodon.prepareUrlLogin());
});
