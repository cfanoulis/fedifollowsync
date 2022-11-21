import MetaTags from 'components/MetaTags';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<MetaTags />
				<link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css"
					integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY="
					crossOrigin="anonymous"
				></link>
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
