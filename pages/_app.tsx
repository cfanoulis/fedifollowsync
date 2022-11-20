import type { AppProps } from 'next/app';
import Head from 'next/head.js';
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			<Head>
				<title>FediFollowSync</title>
				<link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
				{/*this should be slimmed down to the 2 icons I need...*/}
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css"
					integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY="
					crossOrigin="anonymous"
				></link>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
