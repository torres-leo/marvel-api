import React from 'react';
import { useRouter } from 'next/router';
import Input from '/components/Input';
import { login } from '../../redux/reducers/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const errorCredentials = useSelector((state) => state.app.error);
	const isLogged = useSelector((state) => state.app.isLogged);

	// useEffect(() => {
	// 	if (isLogged === true) {
	// 		router.push('/');
	// 	} else {
	// 		router.push('/login');
	// 	}
	// }, [isLogged]);

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			if ([username, password].includes('')) {
				setError('All fields are required');
				setTimeout(() => {
					setError('');
				}, 3500);
				return;
			}
			dispatch(login({ username, password }));
		} catch (error) {
			// setError(error);
			console.log(error);
		}
	};

	const renderErrorCredentials = () => {
		if (errorCredentials) return <p>{errorCredentials}</p>;
	};

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className='Login'>
			<div className='Login-logo' />
			<div className='Login-container'>
				<form className='Login-form' onSubmit={handleSubmit}>
					<h1 className='Login-title'>
						<span>Login</span>
					</h1>
					<div className='Login-group'>
						<label htmlFor='user' className='Login-label'>
							Email / User
						</label>
						<Input
							id='user'
							type='text'
							className='Login-input'
							placeholder='example@example.com'
							onChange={handleUsername}
							value={username}
						/>
					</div>
					<div className='Login-group'>
						<label htmlFor='password' className='Login-label'>
							Password
						</label>
						<Input
							id='password'
							// type='password'
							className='Login-input'
							placeholder='Enter your password email'
							onChange={handlePassword}
							value={password}
						/>
					</div>
					{error && <p>{error}</p>}
					{renderErrorCredentials()}
					<Input type='submit' value='Log in' className='Login-submit' />
				</form>
			</div>
			<div className='Login-line' />
		</div>
	);
};

export default Login;
