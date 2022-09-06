import React from 'react';
import Head from 'next/head';
import Header from '../Header';
import AppNav from '../AppNav';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>Marvel API</title>
				<meta name='description' content='Consume Marvel API' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<AppNav />
			{children}
		</>
	);
};

export default Layout;
