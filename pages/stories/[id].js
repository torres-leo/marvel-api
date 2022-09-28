import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import Icon from '../../components/Icon';

const Story = ({ response, responseComics, responseCharacters }) => {
	const [story] = response;
	const [comics] = responseComics;
	const [characters] = [responseCharacters];
	const [creators] = [story.creators.item];

	const { title, description, thumbnail } = story;
	console.log(story);
	// console.log(comics);
	console.log(creators);

	const renderDescription = () => {
		if (!description) return <span className='Story-text notAvaible'>Description not avaible.</span>;
		return <span className='Story-text resume'>{ReactHtmlParser(description)}</span>;
	};

	const renderCreators = () => {
		if (!creators) return <p className='Story-text notAvaible'>Creators not avaible.</p>;

		return creators.map((creator, index) => (
			<li key={index} className='Story-text creators'>
				{creator.name}.
			</li>
		));
	};

	const renderComics = () => {
		if (!comics.length) return <p className='notAvaible'>No comics Avaible</p>;
		return comics.map((comics) => {
			const {
				id,
				title,
				thumbnail: { path, extension },
			} = comics;
			return (
				<Link href={`/comics/${id}`} key={uuidv4()}>
					<div className='containerComics'>
						<Image
							width={42}
							height={42}
							layout='fixed'
							src={`${path}.${extension}`}
							alt={`Image ${title}`}
							objectFit='cover'
						/>
						<p className='Story-text comic'>{title}</p>
					</div>
				</Link>
			);
		});
	};

	const renderCharacters = () => {
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
						/>
						<p className='Comic-text character'>{name}</p>
					</div>
				</Link>
			);
		});
	};
	return (
		<div className='Story'>
			<div className='Story-head'>
				<Link href='/stories'>
					<a>
						<Icon className='fa-regular fa-circle-left Back' title='Return page' />
					</a>
				</Link>
				<h2 className='Story-name'>
					<span>Story: </span>
					<span className='Story-title'>{title}</span>
				</h2>
			</div>
			<div className='Story-content'>
				<div className='Story-image'>
					<Image
						layout='fill'
						src={`${
							thumbnail
								? `${thumbnail.path}.${thumbnail.extension}`
								: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
						}
					`}
						alt={`Image ${title}`}
						priority
					/>
				</div>
				<div className='Story-description'>
					<h2 className='Story-boxTitle'>
						<span>Description</span>
					</h2>

					<p className='Story-text '>Resume:{renderDescription()}</p>
					<p className='Story-text '>Creators:</p>
					<ul className='Story-list'>{renderCreators()}</ul>
				</div>
				<div className='Story-characters'>
					<h2 className='Story-boxTitle'>
						<span>Comics</span>
					</h2>
					<div className='Story-info'>{renderComics()}</div>
				</div>
				<div className='Story-stories'>
					<h2 className='Story-boxTitle'>
						<span>Characters</span>
					</h2>
					{renderCharacters()}
				</div>
			</div>
		</div>
	);
};

Story.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ query: { id } }) {
	const { data } = await axiosClient(`/stories/${id}`);
	const response = data.data.results;

	const { data: comics } = await axiosClient(`/stories/${id}/comics`);
	const responseComics = comics.data.results;

	const { data: characters } = await axiosClient(`/stories/${id}/characters`);
	const responseCharacters = characters.data.results;

	return {
		props: {
			response,
			responseComics,
			responseCharacters,
		},
	};
}

export default Story;
