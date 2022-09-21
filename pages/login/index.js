import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import Link from 'next/link';

const Login = () => {
	const router = useRouter();
	const isLogged = useSelector((state) => state.user.isLogged);

	useEffect(() => {
		if (isLogged) {
			router.push('/');
		}

		//eslint-disable-next-line
	}, [isLogged]);

	return (
		<div className='Login'>
			<div className='Login-nav'>
				<Link href='/'>
					<div className='Login-image' />
				</Link>
				<Link href='/'>
					<a className='Login-link'>Home</a>
				</Link>
			</div>
			<div className='Login-logo' />
			<div className='Login-container'>
				<LoginForm />
			</div>
			{/* <div className='Login-line' /> */}
		</div>
	);
};

export default Login;
