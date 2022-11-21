export default function Home() {
	return (
		<main className="container">
			<h1 style={{ marginBottom: '4px' }}>FediFollowSync</h1>
			<h2 style={{ fontSize: '12px', marginBottom: '2rem' }}>(say that quickly 3 times)</h2>
			<div>
				<p>
					Fedifollowsync serves as a bridge for those leaving Twitter. Setting it up once, it checks every 7 days if any of the people you
					follow on Twitter got a Fediverse account. Once it detects someone made an account, it DMs your Fediverse user page & let's you
					select who to follow!
				</p>
				<a className="accent block" style={{ padding: '0.45em' }} href="api/auth/twitter/init">
					Find your people, by logging in with <i className="fa fa-twitter fa-fw" aria-hidden="true"></i> Twitter
				</a>
			</div>
			<div>
				<div className="fixed block">
					<h3>Welcome aboard, @user</h3>
					<div className="block-copy">
						Great, first step, done <i className="fa fa-check fa-fw block-copy"></i>. We see you follow numberOfFollowing people.
						<br />
						Now, login with your Mastodon server to finish the deal!
						<form method="get" target="/api/auth/fediverse/init" className="flexbox">
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
								formAction="/api/auth/fediverse/init"
								formMethod="get"
								style={{ padding: '0.45em' }}
							>
								Login with <i className="fa fa-mastodon fa-fw" aria-hidden="true"></i> Mastodon
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
