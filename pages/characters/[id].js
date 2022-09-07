import React from 'react';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';

const Character = ({ response }) => {
	const [character] = response;
	const [series] = [character.series.items];
	const [comics] = [character.comics.items];

	const {
		name,
		description,
		thumbnail: { path, extension },
	} = character;

	const renderComics = () => {
		if (!comics) return <p className='Character notAvaible'>No comics</p>;

		return comics.map((comic, index) => (
			<p key={index} className='Character-text'>
				{comic.name}
			</p>
		));
	};

	const renderSeries = () => {
		if (!series) return <p className='Character notAvaible'>No series</p>;

		return series.map((serie, index) => (
			<p key={index} className='Character-text'>
				{serie.name}
			</p>
		));
	};

	const renderDescription = () => {
		if (!description) return <p className='Character notAvaible'>Description not avaible.</p>;

		return <p className='Character-text'>{ReactHtmlParser(description)}</p>;
	};

	return (
		<div className='Character'>
			<h2 className='Character-name'>
				<span>Character: {name}</span>
			</h2>
			<div className='Character-content'>
				<div className='Character-image'>
					<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${name}`} priority />
				</div>
				<div className='Character-description'>
					<h2 className='Character-title'>
						<span>Description</span>
					</h2>
					{renderDescription()}
				</div>
				<div className='Character-comics'>
					<h2 className='Character-title'>
						<span>Comics</span>
					</h2>
					{renderComics()}
				</div>
				<div className='Character-series'>
					<h2 className='Character-title'>
						<span>Series</span>
					</h2>
					{renderSeries()}
				</div>
			</div>
		</div>
	);
};

Character.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ query: { id } }) {
	const { data } = await axiosClient(`/characters/${id}`);
	const response = data.data.results;

	return {
		props: {
			response,
		},
	};
}

export default Character;
