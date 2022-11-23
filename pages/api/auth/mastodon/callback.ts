import MastodonManager from 'lib/manager/MastodonManager';
import { withSessionRoute } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';
import db from 'prisma/db';

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!req.session.mastodon) {
		req.session.destroy();
		return res.redirect('/');
	}
	const { code, error } = req.query;
	if (error || !code || !req.session.mastodon.instance) {
		console.log(`req ERR! masto said ${error ?? '...wait no, it said nothing'}`);
		throw new Error('bad session!');
	}

	if (Array.isArray(code)) {
		console.log(`req ERR! suspicious redirect received, killing session`);
		throw new Error('bad session!');
	}

	const mastodon = await new MastodonManager(req.session.mastodon.instance).getClientCredentials();

	const mastoAuth = await mastodon.exchangeCode(code);
	if (mastoAuth.error) throw new Error(`Mastodon didn't return access creds`);

	const mastoUser = await mastodon.getAuthorizedUser(mastoAuth.access_token);

	await db.fediversePerson.upsert({
		create: {
			mastodon_id: mastoUser.username!,
			spice: mastoAuth.access_token,
			instance: {
				connect: {
					instance_url: req.session.mastodon!.instance!
				}
			},
			belongs_to: {
				connect: {
					id: req.session.uid
				}
			}
		},
		update: {
			spice: mastoAuth.access_token
		},
		where: { belongs_to_id: req.session.uid }
	});

	req.session.mastodon.username = mastoUser.username;
	await req.session.save();

	return res.redirect('/');
});
