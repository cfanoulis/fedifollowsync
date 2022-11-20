import { auth } from 'twitter-api-sdk';

export default class TwitterManager {
	private twitterAuth: auth.OAuth2User;

	public constructor() {
		this.twitterAuth = new auth.OAuth2User({
			client_id: process.env.TWT_ID!,
			client_secret: process.env.TWT_SECRET!,
			callback: 'http://localhost:3000/api/auth/twitter/callback',
			scopes: ['users.read', 'offline.access']
		});
	}

	public prepareUrlLogin(state: string) {
		return this.twitterAuth.generateAuthURL({
			code_challenge_method: 's256',
			state: Buffer.from(state).toString('base64url')
		});
	}

	public async exchangeCode(code: string) {
		return this.twitterAuth.requestAccessToken(code);
	}

	public static SCOPES = ['offline.access', 'users.read'].join('%20');
	public static HEADERS = {
		'User-Agent': 'FediFollowSync/v0 - ffs@fanoulis.dev',
		Authentication: `Basic ${Buffer.from(`${process.env.TWT_ID}:${process.env.TWT_SECRET}`).toString('base64')}`
	};
}
