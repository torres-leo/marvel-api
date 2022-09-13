import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Characters from './characters';
import axiosClient from '../config/axios';

// https://www.youtube.com/watch?v=VbXAwjAxfU0

const Home = ({ characters }) => {
	return <Characters characters={characters} />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

export async function getServerSideProps() {
	const { data } = await axiosClient(`/characters`);
	const characters = data.data.results;

	return {
		props: {
			characters,
		},
	};
}
