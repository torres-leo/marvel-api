import React from 'react';

const Input = ({ type, className, placeholder, value, id }) => {
	return <input id={id} type={type} placeholder={placeholder} className={className} value={value} />;
};

export default Input;
