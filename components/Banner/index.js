import React from 'react';

const Banner = ({ image1, image2, image3 }) => {
	return (
		<div className='Banner'>
			<div className='Banner-container'>
				<div className='Banner-image' style={{ backgroundImage: `url(${image1.src})` }} />

				<div className='Banner-image' style={{ backgroundImage: `url(${image3.src})` }} />
				<div className='Banner-image' style={{ backgroundImage: `url(${image2.src})` }} />
			</div>
		</div>
	);
};

export default Banner;
