import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Characters from './characters';
import axiosClient from '../config/axios';

const Home = ({ characters }) => {
	return <Characters characters={characters} />;
};

Home.getLayout = (page) => <Layout pageName='Characters'>{page}</Layout>;

export default Home;

export async function getServerSideProps() {
	try {
		const { data } = await axiosClient(`/characters`, { params: { limit: 20, offset: 0 } });
		const characters = data.data.results;
		return {
			props: {
				characters,
			},
		};
	} catch (error) {}
}
