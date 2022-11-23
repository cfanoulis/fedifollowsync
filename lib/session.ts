import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';

const sessionOptions = {
	password: process.env.SESSION_SECRET!,
	cookieName: 'ffses',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 3600
	}
};

export function withSessionRoute(handler: NextApiHandler<unknown>) {
	return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<P extends Record<string, unknown> = Record<string, unknown>>(
	handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
	return withIronSessionSsr(handler, sessionOptions);
}

declare module 'iron-session' {
	interface IronSessionData {
		state?: string;
		code_challenge?: string;
		uid?: string;
		twitter?: {
			avatarUrl: string;
			username: string;
			followingCount: number;
		};
		mastodon?: {
			instance?: string;
			username?: string;
		};
	}
}
