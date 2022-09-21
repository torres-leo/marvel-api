import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/userSlice';
import InputFormik from '../InputFormik';
import Input from '../Input';

const LoginForm = () => {
	const errorCredentials = useSelector((state) => state.user.error);
	const dispatch = useDispatch();

	const schema = Yup.object({
		username: Yup.string().required('Username is required'),
		password: Yup.string().required('Password is required'),
	});
	const initialValues = {
		username: '',
		password: '',
	};

	const renderErrorCredentials = () => {
		if (errorCredentials) return <p className='Login-error credentials'>{errorCredentials}</p>;
	};

	const handleSubmit = (values) => {
		const { username, password } = values;
		dispatch(login({ username, password }));
	};

	return (
		<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
			<Form className='Login-form'>
				<h3 className='Login-title'>Login</h3>
				<div className='Login-group'>
					<label htmlFor='user' className='Login-label'>
						Username
					</label>
					<InputFormik name='username' placeholder='Your username' type='text' />
				</div>
				<div className='Login-group'>
					<label htmlFor='password' className='Login-label'>
						Password
					</label>
					<InputFormik name='password' placeholder='********' type='password' />
				</div>
				{renderErrorCredentials()}
				<Input type='submit' value='Log in' className='Login-submit' />
			</Form>
		</Formik>
	);
};

export default LoginForm;
