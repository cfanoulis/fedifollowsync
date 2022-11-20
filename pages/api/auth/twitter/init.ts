import TwitterManager from 'lib/manager/TwitterManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
	const url = new TwitterManager().prepareUrlLogin('hahaveryfunny');
	res.redirect(307, url);
}
