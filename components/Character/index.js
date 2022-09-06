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
				<Image width={200} height={150} layout='responsive' src={`${path}.${extension}`} alt={`Image ${name}`} />
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
