import MastodonManager from 'lib/manager/MastodonManager';
import { withSessionRoute } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!req.session.mastodon) {
		req.session.destroy();
		return res.redirect('/');
	}
	const { code, error } = req.query;
	if (error || !code) {
		console.log(`req ERR! masto said ${error ?? '...wait no, it said nothing'}`);
		throw new Error('bad session!');
	}

	if (Array.isArray(code)) {
		console.log(`req ERR! suspicious redirect received, killing session`);
		throw new Error('bad session!');
	}

	const mastodon = await new MastodonManager(req.session.mastodon.instance).getClientCredentials();

	const mastoToken = await mastodon.exchangeCode(code);

	return res.status(200).send({ mastoToken });

	// const twtUser = await twtResponse.client.v2.me({ 'user.fields': ['public_metrics'] });

	// const newTwitterPerson = (await db.twitterPerson.count({ where: { twitter_id: twtUser.data.id } })) === 0;
	// const user = newTwitterPerson
	// 	? await db.user.create({
	// 			data: {
	// 				twitter: {
	// 					create: {
	// 						twitter_id: twtUser.data.id,
	// 						spice: twtResponse.refreshToken! // todo THIS **NEEDS** TO BE ENRYPTED BOI
	// 					}
	// 				}
	// 			},
	// 			select: {
	// 				id: true
	// 			}
	// 	  })
	// 	: await db.twitterPerson
	// 			.update({
	// 				where: {
	// 					twitter_id: twtUser.data.id
	// 				},
	// 				data: {
	// 					spice: twtResponse.refreshToken
	// 				},
	// 				select: { belongs_to_id: true }
	// 			})
	// 			.then((e) => {
	// 				return { id: e.belongs_to_id };
	// 			});

	// req.session.uid = user.id;
	// req.session.twtGreet = {
	// 	verified: twtUser.data.verified ?? false,
	// 	username: twtUser.data.username,
	// 	followingCount: (twtUser.data.public_metrics ?? { following_count: 69420 }).following_count ?? 69420
	// };

	// await req.session.save();
});
