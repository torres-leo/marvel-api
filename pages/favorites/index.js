import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '/components/Layout';
import Button from '/components/Button';
import Characters from '/components/Favorites/Characters';
import Comics from '/components/Favorites/Comics';

const Favorites = () => {
	const [category, setCategory] = useState('CHARACTER');

	const isLogged = useSelector((state) => state.user.isLogged);

	const handleClick = (name) => () => {
		setCategory(name);
	};

	const renderFavorites = () => {
		if (category === 'CHARACTER') return <Characters />;

		return <Comics />;
	};

	return (
		<div className='Favorites'>
			<div className='Favorites-container'>
				<h2 className='Favorites-title'>
					<span>Favorites</span>
				</h2>

				<div className='Favorites-filters'>
					<Button className={`Button ${category === 'CHARACTER' && 'active'}`} onClick={handleClick('CHARACTER')}>
						Characters
					</Button>
					<Button className={`Button ${category === 'COMIC' && 'active'}`} onClick={handleClick('COMIC')}>
						Comics
					</Button>
				</div>
				<div className='Favorites-cards'>{renderFavorites()}</div>
			</div>
		</div>
	);
};
Favorites.getLayout = (page) => <Layout>{page}</Layout>;

export default Favorites;
