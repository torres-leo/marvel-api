import React from 'react';
import Image from 'next/image';
// import Layout from '../../components/Layout';
import Input from '/components/Input';

const Login = () => {
	return (
		<div className='Login'>
			<div className='Login-logo' />
			<div className='Login-container'>
				<form className='Login-form'>
					<h1 className='Login-title'>
						<span>Login</span>
					</h1>
					<div className='Login-group'>
						<label htmlFor='user' className='Login-label'>
							Email / User
						</label>
						<Input id='user' type='text' className='Login-input' placeholder='example@example.com' />
					</div>
					<div className='Login-group'>
						<label htmlFor='password' className='Login-label'>
							Password
						</label>
						<Input id='password' type='password' className='Login-input' placeholder='Enter your password email' />
					</div>
					<Input type='submit' value='Log in' className='Login-submit' />
				</form>
			</div>
			<div className='Login-line' />
		</div>
	);
};

export default Login;
