import React from 'react';
import Link from 'next/link';

const AppNav = () => {
	return (
		<ul className='Nav'>
			<Link href='/'>
				<li className='Nav-link'>Characters</li>
			</Link>

			<Link href='/comics'>
				<li className='Nav-link'>Comics</li>
			</Link>
		</ul>
	);
};

export default AppNav;
