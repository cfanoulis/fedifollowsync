import env from 'lib/env';
import type { MastodonAccount, MastodonApiError, OauthApplication } from 'lib/types/Mastodon';
import { post } from 'lib/util';
import db from 'prisma/db';

export default class MastodonManager {
	#credentials?: { clientId: string; clientSecret: string };
	public constructor(public instance: string) {}

	/**
	 * Base API url
	 */
	protected get baseApiUrl() {
		return `https://${this.instance}/api/v1`;
	}

	/**
	 * Base oAuth url
	 */
	protected get baseOauthUrl() {
		return `https://${this.instance}/oauth`;
	}

	/**
	 * Generate an oauth authz link for a user
	 * @returns oauth url
	 */
	public prepareUrlLogin() {
		if (!this.#credentials) throw new Error('no credentials!');

		const params = new URLSearchParams({
			client_id: this.#credentials.clientId,
			redirect_uri: `${env.PUBLIC_URL}/api/auth/mastodon/callback`,
			response_type: 'code',
			scope: MastodonManager.SCOPES
		});

		return `${this.baseOauthUrl}/authorize?${params}`;
	}

	public exchangeCode(code: string) {
		if (!this.#credentials) throw new Error('no credentials!');

		return post(`${this.baseOauthUrl}/token`, {
			body: new URLSearchParams({
				client_id: this.#credentials.clientId,
				client_secret: this.#credentials.clientSecret,
				redirect_uri: `${env.PUBLIC_URL}/api/auth/mastodon/callback`,
				grant_type: 'authorization_code',
				code
			})
		});
	}

	public async getAuthorizedUser(token: string) {
		return fetch(`${this.baseApiUrl}/accounts/verify_credentials`, {
			headers: {
				'User-Agent': `fedifollowsync/v${env.GIT_COMMIT}`,
				Authentication: `Bearer ${token}`
			}
		}).then((r) => r.json() as Promise<Partial<MastodonAccount> & MastodonApiError>);
	}

	/**
	 * Fetch credentials from db, or request new ones
	 * @returns this
	 */
	public async getClientCredentials() {
		const credentials = await db.mastodonClient.findUnique({
			where: { instance_url: this.instance },
			select: { client_id: true, client_secret: true }
		});

		if (credentials) {
			this.#credentials = { clientId: credentials.client_id, clientSecret: credentials.client_secret };
			return this;
		}

		return this.getNewInstanceCredentials();
	}

	protected async getNewInstanceCredentials() {
		const res = await post<OauthApplication & MastodonApiError>(`${this.baseApiUrl}/apps`, {
			body: new URLSearchParams({
				client_name: 'Hellotesitnghere',
				redirect_uris: `${env.PUBLIC_URL}/api/auth/mastodon/callback`,
				scopes: MastodonManager.SCOPES,
				website: `http://${env.PUBLIC_URL}`
			})
		});

		if (res.error) throw new Error(res.error);
		if (!res.client_id || !res.client_secret) throw new Error(`${this.instance} returned no credentials for oauth`);

		await db.mastodonClient.create({
			data: {
				instance_url: this.instance,
				client_id: res.client_id,
				client_secret: res.client_secret
			}
		});

		this.#credentials = { clientId: res.client_id, clientSecret: res.client_secret };
		return this;
	}

	public static SCOPES = 'read:follows read:accounts write:follows';
}
