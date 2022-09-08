import React from 'react';
import Link from 'next/link';

const AppNav = () => {
	return (
		<div className='Nav'>
			<div className='Nav-content'>
				<ul className='Nav-list'>
					<Link href='/'>
						<li className='Nav-link'>Characters</li>
					</Link>

					<Link href='/comics'>
						<li className='Nav-link'>Comics</li>
					</Link>
				</ul>
				<Link href='/login'>
					<a className='Nav-login'>Login</a>
				</Link>
			</div>
		</div>
	);
};

export default AppNav;
