import Link from 'next/link';

interface TwitterBlockProps {
	username: string;
	followingCount: number;
}

export default function TwitterBlock({ username, followingCount }: TwitterBlockProps) {
	return (
		<>
			<div className="fixed block">
				<h3>Welcome aboard, @{username}</h3>
				<div className="block-copy">
					Great, first step, done <i className="fa fa-check fa-fw block-copy"></i>. We see you follow {followingCount}
					{followingCount > 1000 ? " (damn, that's a lot) " : ' '}people.
					<br />
					Now, login with your Mastodon server to finish the deal!
					<form className="flexbox">
						<div className="wrapper fixed block">
							<input
								name="server"
								autoComplete="mastodon-server"
								required
								inputMode="email"
								placeholder="gagaren@mastodon.social"
								style={{ padding: '0.35em' }}
							/>
						</div>
						<button
							className="accent block"
							type="submit"
							formAction="/api/auth/mastodon/init"
							formMethod="get"
							style={{ padding: '0.45em' }}
						>
							Login with <i className="fa fa-mastodon fa-fw" aria-hidden="true"></i> Mastodon
						</button>
					</form>
					<sub>
						Or, just <Link href="/api/auth/bye">get out really quickly</Link>
					</sub>
				</div>
			</div>
		</>
	);
}
