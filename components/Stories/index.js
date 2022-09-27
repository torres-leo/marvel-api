import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import Icon from '/components/Icon';

const StoryCard = ({ story }) => {
	const { title, id, thumbnail } = story;
	return (
		<article className='Card story'>
			<div className='Card-image'>
				<Image
					layout='fill'
					src={`${
						thumbnail
							? `${thumbnail.path}.${thumbnail.extension}`
							: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
					}
					`}
					alt={`Image ${ReactHtmlParser(title)}`}
					quality={100}
					priority
				/>
			</div>
			<div className='Card-info story'>
				<h3 className='Card-name'>
					<span>{ReactHtmlParser(title)}</span>
				</h3>
				<div className='Card-link story'>
					<Link href={`/stories/${id}`}>
						<a className='Card-redirect story'>
							View Storie
							<Icon className='fa-solid fa-eye icon-eye' />
						</a>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default StoryCard;
