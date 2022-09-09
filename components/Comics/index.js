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
				<Image
					layout='fill'
					src={`${path}.${extension}`}
					alt={`Image ${title}`}
					quality={100}
					// objectFit='cover'
					priority
				/>
			</div>
			<div className='Card-info'>
				<h3 className='Card-name'>
					<span>{title}</span>
				</h3>
				<Link href={`/comics/${id}`}>
					<a className='Card-redirect'>View Comic</a>
				</Link>
			</div>
		</article>
	);
};

export default ComicsCard;
