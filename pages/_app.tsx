import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/normalize.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
// todo: move links to document.tsx & fork fork-awesome
