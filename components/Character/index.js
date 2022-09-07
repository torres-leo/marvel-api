import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CharacterCard = ({ character }) => {
	const {
		id,
		name,
		thumbnail: { path, extension },
	} = character;

	return (
		<article className='Card'>
			<div className='Card-image'>
				<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${name}`} priority />
			</div>
			<h3 className='Card-name'>
				<span>{name}</span>
			</h3>
			<Link href={`/characters/${id}`}>
				<a className='Card-redirect'>View Character</a>
			</Link>
		</article>
	);
};

export default CharacterCard;
