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
		</main>
	);
}
