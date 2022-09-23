import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '/components/Layout';
import Button from '/components/Button';
import axiosClient from '../../config/axios';
import axiosAPI from '../../config/axiosAPI';

const Favorites = () => {
	const [category, setCategory] = useState('CHARACTER');
	const [favoriteList, setFavoritesList] = useState([]);
	const userToken = useSelector((state) => state.user.userToken);

	const handleClick = (name) => () => {
		setCategory(name);
	};

	useEffect(() => {
		getFavorites();
		//eslint-disable-next-line
	}, [category]);

	useEffect(() => {
		renderFavorites();
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

	const renderFavorites = () => {
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
		const { data } = await axiosClient(`/characters/${marvelId}`);
		const characters = data.data.results;
		console.log(characters);
	};

	const getComic = async (marvelId) => {
		const { data } = await axiosClient(`/comics/${marvelId}`);
		const responseComic = data.data.results;
		console.log(responseComic);
	};

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
			</div>
		</div>
	);
};
Favorites.getLayout = (page) => <Layout>{page}</Layout>;

export default Favorites;
