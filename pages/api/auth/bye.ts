import { withSessionRoute } from 'lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(function handler(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy();
	res.redirect(307, '/');
});
