import React from 'react';

const Input = ({ type, className, placeholder, value, id, onClick, onChange }) => {
	return (
		<input
			id={id}
			type={type}
			placeholder={placeholder}
			className={className}
			value={value}
			onClick={onClick}
			onChange={onChange}
		/>
	);
};

export default Input;
