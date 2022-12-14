import React, { useMemo } from 'react';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import Icon from '../../components/Icon';
import Link from 'next/link';

const Comic = ({ response, responseCharacters, responseStories }) => {
	const [comic] = response;
	const [stories] = [responseStories];
	const [characters] = [responseCharacters];
	const [creators] = [comic.creators.items];
	const {
		title,
		description,
		thumbnail: { path, extension },
	} = comic;

	const renderDescription = useMemo(() => {
		if (!description) return <span className='Comic-text notAvaible'>Description not avaible.</span>;
		return <span className='Comic-text resume'>{ReactHtmlParser(description)}</span>;
	}, [description]);

	const renderCreators = useMemo(() => {
		if (!creators.length) return <p className='Comic-text notAvaible'>Creators not avaible.</p>;

		return creators.map((creator, index) => (
			<li key={index} className='Comic-text creators'>
				{creator.name}.
			</li>
		));
	}, [creators]);

	const renderCharacters = useMemo(() => {
		if (!characters.length) return <p className='notAvaible'>No characters Avaible</p>;
		return characters.map((character) => {
			const {
				id,
				name,
				thumbnail: { path, extension },
			} = character;
			return (
				<Link href={`/characters/${id}`} key={character.id}>
					<div className='containerCharacters'>
						<Image
							width={42}
							height={42}
							layout='fixed'
							src={`${path}.${extension}`}
							alt={`Image ${name}`}
							objectFit='cover'
							loading='lazy'
						/>
						<p className='Comic-text character'>{name}</p>
					</div>
				</Link>
			);
		});
	}, [characters]);

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

	return (
		<div className='Comic'>
			<div className='Comic-head'>
				<Link href='/comics'>
					<a>
						<Icon className='fa-regular fa-circle-left Back' title='Return page' />
					</a>
				</Link>
				<h2 className='Comic-name'>
					<span>Comic: </span>
					<span className='Comic-title'>{title}</span>
				</h2>
			</div>
			<div className='Comic-content'>
				<div className='Comic-image'>
					<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${title}`} priority />
				</div>
				<div className='Comic-description'>
					<h2 className='Comic-boxTitle'>
						<span>Description</span>
					</h2>

					<p className='Comic-text '>Resume:{renderDescription}</p>
					<p className='Comic-text '>Creators:</p>
					<ul className='Comic-list'> {renderCreators}</ul>
				</div>
				<div className='Comic-characters'>
					<h2 className='Comic-boxTitle'>
						<span>Characters Appearance</span>
					</h2>
					<div className='Comic-info'>{renderCharacters}</div>
				</div>
				<div className='Comic-stories'>
					<h2 className='Comic-boxTitle'>
						<span>Stories</span>
					</h2>
					{renderStories}
				</div>
			</div>
		</div>
	);
};

Comic.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ query: { id } }) {
	const { data } = await axiosClient(`/comics/${id}`);
	const response = data.data.results;

	const { data: characters } = await axiosClient(`/comics/${id}/characters`);
	const responseCharacters = characters.data.results;

	const { data: stories } = await axiosClient(`/comics/${id}/stories`);
	const responseStories = stories.data.results;

	return {
		props: {
			response,
			responseCharacters,
			responseStories,
		},
	};
}

export default Comic;
