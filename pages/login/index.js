import React from 'react';
import Input from '/components/Input';
import { login } from '../../redux/reducers/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const Login = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if ([username, password].includes('')) {
			setError('All Fields are required');

			setTimeout(() => {
				setError('');
			}, 3500);
			return;
		}

		dispatch(login({ username, password }));
		console.log('Click');
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
					<Input type='submit' value='Log in' className='Login-submit' />
				</form>
			</div>
			<div className='Login-line' />
		</div>
	);
};

export default Login;
