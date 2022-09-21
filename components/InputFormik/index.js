import React from 'react';

import { Field, ErrorMessage } from 'formik';

const InputFormik = ({ name, placeholder, type }) => {
	return (
		<>
			<Field name={name} placeholder={placeholder} type={type} className='Login-input' />
			<p className='Login-error'>
				<ErrorMessage name={name} />
			</p>
		</>
	);
};

export default InputFormik;
