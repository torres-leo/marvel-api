import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ComicsCard = ({ comic }) => {
	// console.log(comic);
	const {
		id,
		title,
		thumbnail: { path, extension },
	} = comic;

	return (
		<article className='Card comic'>
			<div className='Card-image'>
				<Image width={200} height={150} layout='responsive' src={`${path}.${extension}`} alt={`Image ${title}`} />
			</div>
			<h3 className='Card-name'>
				<span>{title}</span>
			</h3>
			<Link href={`/comics/${id}`}>
				<a className='Card-redirect'>View Character</a>
			</Link>
		</article>
	);
};

export default ComicsCard;
