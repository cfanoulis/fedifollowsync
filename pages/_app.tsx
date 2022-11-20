import type { AppProps } from 'next/app';
import Head from 'next/head.js';
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			<Head>
				<title>FediFollowSync</title>
				<link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
