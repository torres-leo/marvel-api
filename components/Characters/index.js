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
		<article className='Characters-card'>
			<div className='Characters-image'>
				<Image width={200} height={150} layout='responsive' src={`${path}.${extension}`} alt={`Image ${name}`} />
			</div>
			<h3 className='Characters-name'>
				<span>{name}</span>
			</h3>
			<Link href={`/characters/${id}`}>
				<a className='Characters-redirect'>View Character</a>
			</Link>
		</article>
	);
};

export default CharacterCard;
