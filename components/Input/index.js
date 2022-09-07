import React from 'react';

const Input = ({ type, className, placeholder, value }) => {
	return <input type={type} placeholder={placeholder} className={className} value={value} />;
};

export default Input;
