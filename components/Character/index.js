import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axiosAPI from '../../config/axiosAPI';
import Icon from '/components/Icon';

const CharacterCard = ({ character, favoritesList, getCharactersFavorites }) => {
	const isLogged = useSelector((state) => state.user.isLogged);
	const userToken = useSelector((state) => state.user.userToken);
	const [] = useState([character.thumbnail]);

	const {
		id,
		name,
		thumbnail: { path, extension },
	} = character;

	const renderCharactersFavs = () => {
		if (!isLogged) return;

		const idExist = favoritesList.some((favorite) => favorite.marvelId === character.id);

		if (idExist && isLogged) return <Icon className='fa-solid fa-heart icon-heart' onClick={onDelete} />;

		return <Icon className='fa-regular fa-heart icon-heart' onClick={addFavorite} />;
	};

	const addFavorite = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		await axiosAPI.post('/favorites', { category: 'CHARACTER', marvelId: id }, config);
		getCharactersFavorites();
	};

	const deleteFavorite = async (characterId) => {
		const indexCharacter = favoritesList.findIndex((element) => element.marvelId === characterId);
		const { id } = favoritesList[indexCharacter];

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};

		await axiosAPI.delete(`/favorites/${id}`, config);
		getCharactersFavorites();
	};

	const onDelete = () => {
		deleteFavorite(character.id);
	};

	return (
		<article className='Card'>
			<div className='Card-image'>
				<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${name} `} quality={100} priority />
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
