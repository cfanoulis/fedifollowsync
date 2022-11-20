import PostresqlPrismaStore from 'lib/manager/SessionManager.js';
import nextSession from 'next-session';

export const getSession = nextSession({
	name: 'sesh',
	store: new PostresqlPrismaStore(),
	autoCommit: false,
	cookie: {
		secure: true,
		sameSite: 'strict',
		httpOnly: true,
		maxAge: -1
	}
});
