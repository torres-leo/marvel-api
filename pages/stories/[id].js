import React from 'react';
import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';

const Story = ({ response, responseComics }) => {
	const [story] = response;
	const [comics] = [story.comics.item];
	const [series] = [story.series.item];
	console.log(story);
	return <div>Story</div>;
};

Story.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ query: { id } }) {
	const { data } = await axiosClient(`/stories/${id}`);
	const response = data.data.results;

	const { data: comics } = await axiosClient(`/stories/${id}/comics`);
	const responseComics = comics.data.results;
	return {
		props: {
			response,
			responseComics,
		},
	};
}

export default Story;
