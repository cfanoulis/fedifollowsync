const title = 'FediFollowSync - Find your people';
const description = 'FediFollowSync allows you to automatically discover people you follow on the Fediverse';

export default function MetaTags() {
	return (
		<>
			<meta name="title" content={title} />
			<meta name="description" content={description} />

			{/* <!-- Open Graph / Facebook --> */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://ffsync.fanoulis.dev/" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{/* <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"></meta> */}

			<meta property="twitter:card" content="app" />
			<meta property="twitter:url" content="https://ffsync.fanoulis.dev/" />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:creator" content="cfanoulis" />
			{/* <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"></meta> */}
		</>
	);
}
