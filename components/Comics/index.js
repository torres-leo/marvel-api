import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '/components/Icon';

const ComicsCard = ({ comic }) => {
	const {
		id,
		title,
		thumbnail: { path, extension },
	} = comic;

	return (
		<article className='Card comic'>
			<div className='Card-image'>
				<Image layout='fill' src={`${path}.${extension}`} alt={`Image ${title}`} quality={100} priority />
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
