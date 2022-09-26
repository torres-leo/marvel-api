/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../config/axios';
import axiosAPI from '../../config/axiosAPI';
import CharacterCard from '../../components/Character';

const Characters = () => {
	const [favoritesList, setFavoritesList] = useState([]);
	const [charactersList, setCharactersList] = useState([]);

	const userToken = useSelector((state) => state.user.userToken);

	useEffect(() => {
		getCharactersFavorites();
	}, []);

	useEffect(() => {
		getCharacter();
	}, [favoritesList]);

	const getCharactersFavorites = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		const { data } = await axiosAPI('/favorites', {
			params: { category: 'CHARACTER' },
			...config,
		});
		setFavoritesList(data);
	};

	const getDataFromAPI = async (marvelId) => {
		if (!favoritesList) return;

		const { data } = await axiosClient(`/characters/${marvelId}`);
		const character = data.data.results;
		return character;
	};

	const getCharacter = async () => {
		if (!favoritesList) return;
		const requests = favoritesList.map((element) => {
			return getDataFromAPI(element.marvelId);
		});
		let response = await Promise.allSettled(requests);
		response = response.filter((item) => item.status === 'fulfilled').map((element) => element.value[0]);
		setCharactersList(response);
	};

	const renderFavorites = () => {
		if (!charactersList) return;

		return charactersList.map((character) => (
			<CharacterCard
				key={character.id}
				character={character}
				favoritesList={favoritesList}
				getCharactersFavorites={getCharactersFavorites}
			/>
		));
	};

	return <Fragment>{renderFavorites()}</Fragment>;
};

export default Characters;
