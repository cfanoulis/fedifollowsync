import TwitterBlock from 'components/TwitterBlock';
import { withSessionSsr } from 'lib/session';
import type { InferGetServerSidePropsType } from 'next';

export default function Home({ show, tuname, tfollowing, tavatar, funame }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<main className="container">
			<h1 style={{ marginBottom: '4px' }}>FediFollowSync</h1>
			<h2 style={{ fontSize: '12px', marginBottom: '2rem' }}>(say that quickly 3 times)</h2>
			<div>
				<p>
					Fedifollowsync serves as a bridge for those leaving Twitter. Setting it up once, it checks every 7 days if any of the people you
					follow on Twitter got a Fediverse account. Once it detects someone made an account, it DMs your Fediverse user page & let&apos;s
					you select who to follow!
				</p>
			</div>
			{show > 0 ? (
				<TwitterBlock username={tuname!} followingCount={tfollowing!} userAvatarUrl={tavatar!} />
			) : (
				<a className="accent blue block" style={{ padding: '0.45em' }} href="api/auth/twitter/init">
					Find your people, by logging in with <i className="fa fa-twitter fa-fw" aria-hidden="true"></i> Twitter
				</a>
			)}
		</main>
	);
}

export const getServerSideProps = withSessionSsr(function ssr({ req }) {
	if (!req.session.uid) return { props: { show: 0, tuname: '', tfollowing: 0, tavatar: '', funame: '' } };
	const show = req.session.twitter ? (req.session.mastodon ? 2 : 1) : 0; // 2: mastodon complete, 1: twitter complete, masto pending, 0: nul state
	return {
		props: {
			show,
			tuname: req.session.twitter?.username ?? '',
			tfollowing: req.session.twitter?.followingCount ?? -1,
			tavatar: req.session.twitter?.avatarUrl ?? '',
			funame: req.session.mastodon?.username ?? ''
		}
	};
});
