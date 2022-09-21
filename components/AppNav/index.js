import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import Input from '../Input';

const AppNav = () => {
	const isLogged = useSelector((state) => state.user.isLogged);
	const dispatch = useDispatch();

	const renderButton = () => {
		if (isLogged)
			return (
				<Link href='/login'>
					<Input type='submit' onClick={handleLogOut} value='Log out' className='Nav-login' />
				</Link>
			);

		return (
			<Link href='/login'>
				<a className='Nav-login'>Log in</a>
			</Link>
		);
	};

	const handleLogOut = () => {
		if (isLogged) return dispatch(logout());
	};

	const renderButtonFavorites = () => {
		if (isLogged)
			return (
				<Link href='/favorites'>
					<a className='Nav-favorites'>Favorites</a>
				</Link>
			);
	};

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
				<div className='Nav-content right'>
					{renderButtonFavorites()}
					{renderButton()}
				</div>
			</div>
		</div>
	);
};

export default AppNav;
