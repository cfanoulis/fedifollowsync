interface OauthApplication {
	name?: string;
	client_id?: string;
	client_secret?: string;
}

interface MastodonApiError {
	error?: string;
}

export interface MastodonAccount {
	id: string;
	username: string;
	acct: string;
	display_name: string;
	locked: boolean;
	bot: boolean;
	avatar: string;
	following_count: number;
}

export interface OauthResponse {
	access_token: string;
	token_type: string;
	scope: string;
	created_at: number;
}
