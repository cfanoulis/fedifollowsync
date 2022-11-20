// Inlined from https://github.com/hoangvvo/next-session/blob/master/LICENSE - license MIT
import { UserSession } from '@prisma/client';

declare module 'next-session' {
	export type SessionData = {
		cookie: Cookie;
	} & Omit<UserSession, 'biscuit'>;
}

type Cookie = {
	httpOnly: boolean;
	path: string;
	domain?: string | undefined;
	secure: boolean;
	sameSite?: boolean | 'lax' | 'strict' | 'none';
} & (
	| { maxAge?: undefined; expires?: undefined }
	| {
			maxAge: number;
			expires: Date;
	  }
);
