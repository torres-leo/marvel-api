import React from 'react';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import Icon from '../../components/Icon';
import Link from 'next/link';

const Comic = ({ response, responseCharacters }) => {
	const [comic] = response;
	const [creators] = [comic.creators.items];
	const [stories] = [comic.stories.items];
	const [characters] = [responseCharacters];
	console.log(comic);
	const {
		title,
		description,
		thumbnail: { path, extension },
	} = comic;

	console.log(comic);

	const renderDescription = () => {
		if (!description) return <span className='Comic-text notAvaible'>Description not avaible.</span>;
		return <span className='Comic-text resume'>{ReactHtmlParser(description)}</span>;
	};

	const renderCreators = () => {
		if (!creators.length) return <p className='Comic-text notAvaible'>Creators not avaible.</p>;

		return creators.map((creator, index) => (
			<li key={index} className='Comic-text creators'>
				{creator.name}.
			</li>
		));
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

	const renderStories = () => {
		if (!stories) return <p>No stories avaible</p>;

		return stories.map((storie, index) => (
			<p key={index} className='Comic-text'>
				{storie.name}
			</p>
		));
	};

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

					<p className='Comic-text '>Resume:{renderDescription()}</p>
					<p className='Comic-text '>Creators:</p>
					<ul className='Comic-list'> {renderCreators()}</ul>
				</div>
				<div className='Comic-characters'>
					<h2 className='Comic-boxTitle'>
						<span>Characters Appearance</span>
					</h2>
					<div className='Comic-info'>{renderCharacters()}</div>
				</div>
				<div className='Comic-stories'>
					<h2 className='Comic-boxTitle'>
						<span>Stories</span>
					</h2>
					{renderStories()}
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
	return {
		props: {
			response,
			responseCharacters,
		},
	};
}

export default Comic;
