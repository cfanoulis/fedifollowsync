import twt from 'lib/manager/TwitterManager';
import { withSessionRoute } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { url, state, codeVerifier } = await twt.prepareUrlLogin();

	req.session.state = state;
	req.session.code_challenge = codeVerifier;
	await req.session.save();

	res.redirect(307, url);
});
