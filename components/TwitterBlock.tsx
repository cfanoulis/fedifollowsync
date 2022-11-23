import Image from 'next/image';

interface TwitterBlockProps {
	username: string;
	followingCount: number;
	userAvatarUrl: string;
}

export default function TwitterBlock({ username, followingCount, userAvatarUrl }: TwitterBlockProps) {
	return (
		<>
			<div className="fixed block flexbox twitter block-copy">
				<div style={{ width: '50%', display: 'flex' }}>
					<Image src={userAvatarUrl} width="72" height="72" alt="twitter profile" style={{ float: 'left', marginRight: '12px' }}></Image>
					<div>
						<h3 style={{ marginTop: '0px' }}>Welcome aboard, @{username}</h3>
						<p>Great, we see you - and your {followingCount} followers! Now, login with Mastodon and get syncin&apos;</p>
					</div>
				</div>
				<form>
					<div className="wrapper fixed block" style={{ width: '100%' }}>
						<input
							name="server"
							autoComplete="mastodon-server"
							inputMode="email"
							placeholder="char@infosec.exchange"
							style={{ padding: '0.35em', width: '100%' }}
						/>
						{/* //TODO: auto detect username in displayname/bio? */}
					</div>
					<button
						className="accent purple block"
						type="submit"
						formAction="/api/auth/mastodon/init"
						formMethod="get"
						style={{ padding: '0.45em', width: '100%' }}
					>
						Login with <i className="fa fa-mastodon fa-fw" aria-hidden="true"></i> Mastodon
					</button>
				</form>
			</div>
		</>
	);
}
