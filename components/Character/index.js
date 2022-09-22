import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { addFovorites } from '../../redux/reducers/favoritesSlice';
import axiosAPI from '../../config/axiosAPI';

import Icon from '/components/Icon';

const CharacterCard = ({ character }) => {
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.user.isLogged);
	const userToken = useSelector((state) => state.user.userToken);

	// const [active, setActive] = useState(false);
	const {
		id,
		name,
		thumbnail: { path, extension },
	} = character;

	const addFavorite = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		const { data } = await axiosAPI.post('/favorites', { category: 'CHARACTER', marvelId: id, userId: 2 }, config);
		console.log(data);
	};

	const renderIconFavorites = () => {
		if (isLogged) return <Icon className='fa-regular fa-heart icon-heart' onClick={addFavorite} />;
	};

	return (
		<article className='Card'>
			<div className='Card-image'>
				<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${name} `} quality={100} priority />
				{/* <Icon className='fa-regular fa-heart icon-heart' onClick={handleClick} /> */}
				{renderIconFavorites()}
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
