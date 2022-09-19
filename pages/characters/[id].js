import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import Icon from '/components/Icon';

const Character = ({ response, responseComics }) => {
	const [character] = response;
	const [series] = [character.series.items];
	const [comics] = [responseComics];

	const {
		name,
		description,
		thumbnail: { path, extension },
	} = character;

	const renderComics = () => {
		if (!comics) return <p className='Character notAvaible'>No comics</p>;

		return comics.map((comic) => {
			const {
				id,
				title,
				thumbnail: { path, extension },
			} = comic;
			return (
				<Link href={`/comics/${id}`} key={comic.id}>
					<div className='containerComics'>
						<p className='Character-text'>{title}</p>
					</div>
				</Link>
			);
		});
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
		if (!description) return <p className='Character notAvaible'>Resume not avaible.</p>;

		return <p className='Character-text'>{ReactHtmlParser(description)}</p>;
	};

	return (
		<div className='Character'>
			<div className='Character-head'>
				<Link href='/'>
					<a>
						<Icon className='fa-regular fa-circle-left Back' title='Return page' />
					</a>
				</Link>

				<h2 className='Character-name'>
					<span>Character: {name}</span>
				</h2>
			</div>
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

	const { data: comics } = await axiosClient(`/characters/${id}/comics`);
	const responseComics = comics.data.results;

	return {
		props: {
			response,
			responseComics,
		},
	};
}

export default Character;
