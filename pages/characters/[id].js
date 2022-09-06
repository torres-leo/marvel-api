import React from 'react';
import { axiosClient } from '../../config/axios';
import Layout from '../../components/Layout';

const Character = ({ id }) => {
	console.log('Hola');
	return <div>Hola</div>;
};

Character.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ query: { id } }) {
	const { data } = await axiosClient(
		`${process.env.NEXT_PUBLIC_API_URL}/characters/${id}?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=${process.env.NEXT_PUBLIC_API_HASH}`
	);
	const character = data.data.results;

	return {
		props: {
			id,
			character,
		},
	};
}

export default Character;
