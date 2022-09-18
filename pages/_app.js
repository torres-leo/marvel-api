import { Helmet } from 'react-helmet';
import '/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<>
			<Helmet>
				<script src='https://kit.fontawesome.com/2e6341f303.js' async />
			</Helmet>
			{getLayout(<Component {...pageProps} />)}
		</>
	);
}

export default MyApp;
