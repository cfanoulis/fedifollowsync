import twt from 'lib/manager/TwitterManager';
import { withSessionRoute } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
	const { code, state, error } = req.query;
	if (error || !code) {
		console.log(`req ERR! twt said ${error ?? '...wait no, it said nothing'}`);
		throw 'bad session!';
	}

	if (Array.isArray(code) || Array.isArray(state) || state !== req.session.state) {
		console.log(`req ERR! suspicious redirect received, killing session`);
		throw 'bad session!';
	}

	const twtResponse = await twt.exchangeCode(code, req.session.code_challenge);
	res.status(200).json({ code, state, error, twtResponse });
});
