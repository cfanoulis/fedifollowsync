import { PrismaClient } from '@prisma/client';
import type { Cookie } from 'lib/types/session';
import type { SessionData, SessionStore } from 'next-session';
import db from 'prisma/db';

// ref to: https://github.com/hoangvvo/next-session/blob/master/src/memory-store.ts
export default class PostresqlPrismaStore implements SessionStore {
	private pg: PrismaClient;

	public constructor() {
		this.pg = db;
	}

	public async get(sessionId: string) {
		const session = await this.pg.userSession.findUniqueOrThrow({
			where: { biscuit: sessionId },
			select: { authed: true, bullshit: true, cookieData: true }
		});

		return { cookie: hydrateJSONCookie(session.cookieData), ...session } as SessionData;
	}

	public async set(sessionId: string, sessionData: SessionData) {
		await this.pg.userSession.create({
			data: {
				biscuit: sessionId,
				authed: sessionData.authed,
				cookieData: JSON.stringify(sessionData.cookie)
			},
			select: {}
		});

		return;
	}

	public async destroy(sessionId: string) {
		await this.pg.userSession.delete({ where: { biscuit: sessionId }, select: {} });

		return;
	}

	public async touch() {
		//noop

		return;
	}
}

const hydrateJSONCookie = (data: string) =>
	JSON.parse(data, (key, value) => {
		if (key === 'expires') return new Date(value);
		return value;
	}) as Cookie;
