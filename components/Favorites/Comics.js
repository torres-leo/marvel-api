/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../../config/axios';
import axiosAPI from '../../config/axiosAPI';
import ComicsCard from '../Comics';
import Icon from '../Icon';

const Comics = () => {
	const [favoritesList, setFavoritesList] = useState([]);
	const [comicsList, setComicsList] = useState([]);

	const isLogged = useSelector((state) => state.user.isLogged);
	const userToken = useSelector((state) => state.user.userToken);

	useEffect(() => {
		getComicsFavorites();
	}, []);

	useEffect(() => {
		getComic();
	}, [favoritesList]);

	const getComicsFavorites = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		const { data } = await axiosAPI('/favorites', {
			params: { category: 'COMIC' },
			...config,
		});
		setFavoritesList(data);
	};

	const getDataFromAPI = async (marvelId) => {
		if (!favoritesList) return;

		const { data } = await axiosClient(`/comics/${marvelId}`);
		const comics = data.data.results;
		return comics;
	};

	const getComic = async () => {
		if (!favoritesList) return;
		const requests = favoritesList.map((element) => {
			return getDataFromAPI(element.marvelId);
		});
		let response = await Promise.allSettled(requests);
		response = response.filter((item) => item.status === 'fulfilled').map((element) => element.value[0]);
		setComicsList(response);
	};

	const renderFavorites = () => {
		if (!isLogged)
			return (
				<div className='Favorites-notFound'>
					<p className='Favorites-text'>You must be logged if you want to see your favorites Comics</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);
		if (isLogged) {
			if (!comicsList.length)
				return (
					<div className='Favorites-notFound'>
						<p className='Favorites-text'>You don't have Favorites Comics</p>
						<Icon className='fa-solid fa-circle-exclamation icon' />
					</div>
				);

			return comicsList.map((comic) => (
				<ComicsCard
					key={uuidv4()}
					comic={comic}
					favoritesList={favoritesList}
					getComicsFavorites={getComicsFavorites}
				/>
			));
		}
	};

	return <Fragment>{renderFavorites()}</Fragment>;
};

export default Comics;
