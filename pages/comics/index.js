import React from 'react';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import ComicsCard from '../../components/Comics';

const Comics = ({ comics }) => {
	const renderComics = () => comics.map((comic) => <ComicsCard key={comic.id} comic={comic} />);
	return (
		<div className='Comics'>
			<div className='Comics-container'>
				<h2 className='Comics-title'>
					<span>COMICS</span>
				</h2>
				<div className='Comics-list'>{renderComics()}</div>
			</div>
		</div>
	);
};

Comics.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
	const { data } = await axiosClient('/comics');
	const comics = data.data.results;

	return {
		props: {
			comics,
		},
	};
}

export default Comics;
