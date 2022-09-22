import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorites, getFavorites } from '../../redux/reducers/favoritesSlice';
import axiosAPI from '../../config/axiosAPI';

import Icon from '/components/Icon';

const CharacterCard = ({ character, favoritesList }) => {
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.user.isLogged);
	const userToken = useSelector((state) => state.user.userToken);

	const {
		id,
		name,
		thumbnail: { path, extension },
	} = character;
	console.log(id);

	const renderCharactersFavs = () => {
		const idExist = favoritesList.some((favorite) => favorite.marvelId === character.id);

		if (idExist && isLogged)
			return <Icon className='fa-solid fa-heart icon-heart' onClick={() => deleteFavorite(character.id)} />;

		return <Icon className='fa-regular fa-heart icon-heart' onClick={addFavorite} />;
	};
	renderCharactersFavs();

	const addFavorite = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		const { data } = await axiosAPI.post('/favorites', { category: 'CHARACTER', marvelId: id }, config);
		return data;
	};

	const deleteFavorite = async (id) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		const { data } = await axiosAPI.delete(`/favorites/${id}`, config);
		return data;
	};

	// const renderIconFavorites = () => {
	// 	if (isLogged) return <Icon className='fa-regular fa-heart icon-heart' onClick={addFavorite} />;
	// };

	return (
		<article className='Card'>
			<div className='Card-image'>
				<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${name} `} quality={100} priority />
				{/* {renderIconFavorites()} */}
				{renderCharactersFavs()}
			</div>
			<div className='Card-info'>
				<h3 className='Card-name'>
					<span>{name}</span>
				</h3>

				<Link href={`/characters/${id}`}>
					<a className='Card-redirect'>
						View Character
						<Icon className='fa-solid fa-eye icon-eye' />
					</a>
				</Link>
			</div>
		</article>
	);
};

export default CharacterCard;
