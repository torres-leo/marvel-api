import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '/components/Icon';
import { useState } from 'react';

const CharacterCard = ({ character }) => {
	const [active, setActive] = useState(false);
	const {
		id,
		name,
		thumbnail: { path, extension },
	} = character;

	const handleClick = () => {
		setActive(!active);
	};

	const renderHeartFavorites = () => {};

	return (
		<article className='Card'>
			<div className='Card-image'>
				<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${name} `} quality={100} priority />
				<Icon className='fa-regular fa-heart icon-heart' onClick={handleClick} />
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
