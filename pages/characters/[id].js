import React from 'react';
import { axiosClient } from '../../config/axios';
import Layout from '../../components/Layout';

const Character = ({ response }) => {
	const [character] = response;
	const {
		name,
		description,
		thumbnail: { path, extension },
	} = character;
	return <div>{description}</div>;
};

Character.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ query: { id } }) {
	const { data } = await axiosClient(
		`${process.env.NEXT_PUBLIC_API_URL}/characters/${id}?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=${process.env.NEXT_PUBLIC_API_HASH}`
	);
	const response = data.data.results;

	return {
		props: {
			response,
		},
	};
}

export default Character;
