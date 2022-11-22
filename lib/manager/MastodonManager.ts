import env from 'lib/env';
import { post } from 'lib/util';

class MastodonManager {
	public getOauthClientSecret(instanceUrl: string, redirectUri = 'http://localhost:3000') {
		const url = `https://${instanceUrl}/api/v1/apps`;
		return post(url, {
			body: new URLSearchParams({
				client_name: 'Hellotesitnghere',
				redirect_uris: `urn:ietf:wg:oauth:2.0:oob,http://${env.PUBLIC_URL}/api/auth/mastodon/callback`,
				scopes: MastodonManager.SCOPES,
				website: env.PUBLIC_URL
			})
		});
	}

	public static SCOPES = 'read:follows read:account write:follows follow';

	//  function generateAuthLink (instanceName, clientId, redirectUri) {
	//   const params = paramsString({
	//     client_id: clientId,
	//     redirect_uri: redirectUri,
	//     response_type: 'code',
	//     scope: SCOPES
	//   })
	//   return `${basename(instanceName)}/oauth/authorize?${params}`
	// }

	//  function getAccessTokenFromAuthCode (instanceName, clientId, clientSecret, code, redirectUri) {
	//   const url = `${basename(instanceName)}/oauth/token`
	//   return post(url, {
	//     client_id: clientId,
	//     client_secret: clientSecret,
	//     redirect_uri: redirectUri,
	//     grant_type: 'authorization_code',
	//     code
	//   }, null, { timeout: WRITE_TIMEOUT })
	// }
}

const mastodon = new MastodonManager();
export default mastodon;
