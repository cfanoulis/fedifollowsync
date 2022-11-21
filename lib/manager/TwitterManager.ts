import { TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2';
export class TwitterManager {
	private twitter: TwitterApiReadOnly;

	public constructor() {
		// this.twitter = new auth.OAuth2User({
		// 	client_id: ,
		// 	client_secret: ,
		// 	callback: 'http://localhost:3000/api/auth/twitter/callback',
		// 	scopes: ['users.read', 'offline.access']
		// });

		this.twitter = new TwitterApi({ clientId: process.env.TWT_ID!, clientSecret: process.env.TWT_SECRET! }).readOnly;
	}

	public async prepareUrlLogin() {
		const { url, codeVerifier, state } = this.twitter.generateOAuth2AuthLink('http://localhost:3000/api/auth/twitter/callback', {
			scope: TwitterManager.SCOPES
		});

		return { url, codeVerifier, state };
	}

	public async exchangeCode(code: string, codeVerifier: string) {
		return this.twitter.loginWithOAuth2({
			code,
			codeVerifier,
			redirectUri: 'http://localhost:3000/api/auth/twitter/callback'
		});
	}

	public static SCOPES = ['offline.access', 'users.read', 'tweet.read', 'follows.read'];
	public static HEADERS = {
		'User-Agent': 'FediFollowSync/v0 - ffs@fanoulis.dev'
		// Authentication: `Basic ${Buffer.from(`${process.env.TWT_ID}:${process.env.TWT_SECRET}`).toString('base64')}`
	};
}

const twt = new TwitterManager();
export default twt;
