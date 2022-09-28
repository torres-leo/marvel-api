import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import Icon from '/components/Icon';

const Character = ({ response, responseComics, responseStories }) => {
	const [character] = response;
	const [stories] = [responseStories];
	const [comics] = [responseComics];

	const {
		name,
		description,
		thumbnail: { path, extension },
	} = character;

	const renderComics = useMemo(() => {
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
						<Image
							width={42}
							height={42}
							layout='fixed'
							src={`${path}.${extension}`}
							alt={`Image ${title}`}
							objectFit='cover'
							loading='lazy'
						/>
						<p className='Character-text'>{title}</p>
					</div>
				</Link>
			);
		});
	}, [comics]);

	const renderStories = useMemo(() => {
		if (!stories) return <p className='notAvaible'>No Stories Avaible</p>;

		return stories.map((story) => {
			const { id, title, thumbnail } = story;
			return (
				<Link href={`/stories/${id}`} key={uuidv4()}>
					<div className='containerStories'>
						<Image
							width={38}
							height={38}
							layout='fixed'
							src={`${
								thumbnail
									? `${thumbnail.path}.${thumbnail.extension}`
									: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
							}
					`}
							alt={`Image ${title}`}
							objectFit='cover'
						/>
						<p className='Character-text'>{title}</p>
					</div>
				</Link>
			);
		});
	}, [stories]);

	const renderDescription = useMemo(() => {
		if (!description) return <p className='Character notAvaible'>Resume not avaible.</p>;

		return <p className='Character-text'>{ReactHtmlParser(description)}</p>;
	}, [description]);

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
					{renderDescription}
				</div>
				<div className='Character-comics'>
					<h2 className='Character-title'>
						<span>Comics</span>
					</h2>
					{renderComics}
				</div>
				<div className='Character-series'>
					<h2 className='Character-title'>
						<span>Stories</span>
					</h2>
					{renderStories}
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

	const { data: stories } = await axiosClient(`/characters/${id}/stories`);
	const responseStories = stories.data.results;

	return {
		props: {
			response,
			responseComics,
			responseStories,
		},
	};
}

export default Character;
