import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Layout from '/components/Layout';
import Button from '/components/Button';
import axiosClient from '../../config/axios';
import axiosAPI from '../../config/axiosAPI';
import CharacterCard from '../../components/Character';
import ComicsCard from '../../components/Comics';

const Favorites = () => {
	const [category, setCategory] = useState('CHARACTER');
	const [favoriteList, setFavoritesList] = useState([]);
	const [charactersList, setCharactersList] = useState([]);
	const [comicsList, setComicsList] = useState([]);
	const userToken = useSelector((state) => state.user.userToken);

	const handleClick = (name) => () => {
		setCategory(name);
		setCharactersList([]);
		setComicsList([]);
	};

	useEffect(() => {
		getFavorites();
		//eslint-disable-next-line
	}, [category]);

	useEffect(() => {
		getData();
		//eslint-disable-next-line
	}, [favoriteList]);

	const getFavorites = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		const { data } = await axiosAPI('/favorites', {
			params: { category: category },
			...config,
		});
		setFavoritesList(data);
	};

	const getData = () => {
		switch (category) {
			case 'CHARACTER':
				favoriteList?.map((element) => {
					const { marvelId } = element;
					getCharacter(marvelId);
				});
				break;
			case 'COMIC':
				favoriteList?.map((element) => {
					const { marvelId } = element;
					getComic(marvelId);
				});
				break;
			default:
				break;
		}
	};

	const getCharacter = async (marvelId) => {
		setCharactersList([]);
		const { data } = await axiosClient(`/characters/${marvelId}`);
		const character = data.data.results;

		setCharactersList((prevState) => [...prevState, ...character]);
		// setCharactersList([charactersList, character]);
	};

	const getComic = async (marvelId) => {
		const { data } = await axiosClient(`/comics/${marvelId}`);
		const comic = data.data.results;
		setComicsList((prevState) => [...prevState, ...comic]);
	};

	const renderCharacters = () => {
		// if (favoriteList && category === 'CHARACTER')
		// 	return charactersList.map((character) => (
		// 		<CharacterCard key={character.id} character={character} favoritesList={favoriteList} />
		// 	));
		console.log(charactersList);
	};

	const renderComics = () => {
		comicsList?.map((comic) => <ComicsCard key={uuidv4()} comic={comic} />);
	};

	const renderFavorites = () => {
		if (category === 'CHARACTER') return renderCharacters();

		return renderComics();
	};

	// useEffect(() => {
	// 	renderCharacters();
	// }, []);

	return (
		<div className='Favorites'>
			<div className='Favorites-container'>
				<h2 className='Favorites-title'>
					<span>Favorites</span>
				</h2>

				<div className='Favorites-filters'>
					<Button className={`Button ${category === 'CHARACTER' && 'active'}`} onClick={handleClick('CHARACTER')}>
						Characters
					</Button>
					<Button className={`Button ${category === 'COMIC' && 'active'}`} onClick={handleClick('COMIC')}>
						Comics
					</Button>
				</div>
				{/* <div className='Characters-list'>{renderCharacters()}</div> */}
				{renderFavorites()}
			</div>
		</div>
	);
};
Favorites.getLayout = (page) => <Layout>{page}</Layout>;

export default Favorites;
