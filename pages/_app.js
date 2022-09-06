import { Helmet } from 'react-helmet';
import '/styles/main.scss';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<>
			<Helmet>
				<script src='https://kit.fontawesome.com/2e6341f303.js' async />
			</Helmet>
			<div>{getLayout(<Component {...pageProps} />)}</div>
		</>
	);
}

export default MyApp;
