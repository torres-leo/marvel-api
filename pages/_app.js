import { Helmet } from 'react-helmet';
import '/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Fragment } from 'react';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<Fragment>
			<Helmet>
				<script src='https://kit.fontawesome.com/2e6341f303.js' async />
			</Helmet>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{getLayout(<Component {...pageProps} />)}
				</PersistGate>
			</Provider>
		</Fragment>
	);
}

export default MyApp;
