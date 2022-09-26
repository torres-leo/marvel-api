import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Icon from '/components/Icon';
import axiosAPI from '../../config/axiosAPI';

const ComicsCard = ({ comic, favoritesList, getComicsFavorites }) => {
	const isLogged = useSelector((state) => state.user.isLogged);
	const userToken = useSelector((state) => state.user.userToken);
	const {
		id,
		title,
		thumbnail: { path, extension },
	} = comic;

	const renderComicsFavs = () => {
		if (!isLogged) return;

		const idExist = favoritesList.some((favorite) => favorite.marvelId === comic.id);

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
		await axiosAPI.post('/favorites', { category: 'COMIC', marvelId: id }, config);
		getComicsFavorites();
	};

	const deleteFavorite = async (comicId) => {
		const indexCharacter = favoritesList.findIndex((element) => element.marvelId === comicId);
		const { id } = favoritesList[indexCharacter];

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};

		await axiosAPI.delete(`/favorites/${id}`, config);
		getComicsFavorites();
	};

	const onDelete = () => {
		deleteFavorite(comic.id);
	};

	return (
		<article className='Card comic'>
			<div className='Card-image'>
				<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${title}`} quality={100} priority />
				{renderComicsFavs()}
			</div>
			<div className='Card-info comic'>
				<h3 className='Card-name'>
					<span>{title}</span>
				</h3>
				<div className='Card-link'>
					<Link href={`/comics/${id}`}>
						<a className='Card-redirect comic'>
							View Comic
							<Icon className='fa-solid fa-eye icon-eye' />
						</a>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default ComicsCard;
