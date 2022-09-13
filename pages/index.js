import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Characters from './characters';
import axiosClient from '../config/axios';

// https://www.youtube.com/watch?v=VbXAwjAxfU0

const Home = ({ characters }) => {
	// const Home = () => {
	const [charactersList, setCharactersList] = useState([characters]);

	let offset = 0;
	const loadMoreCharacters = async () => {
		const { data } = await axiosClient('/characters', { params: { offset: `${offset}`, limit: 20 } });
		const newCharacters = [];
		const newCharactersRender = data?.data.results;
		newCharactersRender.forEach((ch) => newCharacters.push(ch));
		setCharactersList((prevState) => [...prevState, ...newCharacters]);
		offset += 10;
	};

	const handleScroll = (e) => {
		if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
			// loadMoreCharacters();
			console.log('Bottom');
		}
	};

	useEffect(() => {
		loadMoreCharacters();
		window.addEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Characters characters={characters} />;
	// return <Characters characters={charactersList} />;
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
