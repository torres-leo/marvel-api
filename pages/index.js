import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Characters from './characters';
import axiosClient from '../config/axios';

const Home = ({ characters }) => {
	// const Home = () => {
	// 	const [charactersList, setCharactersList] = useState([]);

	// 	let offset = 0;
	// 	const loadMoreCharacters = async () => {
	// 		const { data } = await axiosClient('/characters', { params: { offset: `${offset}` } });
	// 		const newCharacters = [];
	// 		const characters = data.data.results;
	// 		characters.forEach((ch) => newCharacters.push(ch));
	// 		console.log(newCharacters);
	// 		setCharactersList((prevState) => [...prevState, ...newCharacters]);
	// 		offset += 10;
	// 	};

	// 	const handleScroll = (e) => {
	// 		if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
	// 			loadMoreCharacters();
	// 		}
	// 	};

	// 	useEffect(() => {
	// 		loadMoreCharacters();
	// 		window.addEventListener('scroll', handleScroll);
	// 		// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	}, []);

	// 	return <Characters characters={charactersList} />;
	return <Characters characters={characters} />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

export async function getServerSideProps() {
	const { data } = await axiosClient(`/characters`, { params: { offset: 10 } });
	const characters = data.data.results;

	return {
		props: {
			characters,
		},
	};
}
