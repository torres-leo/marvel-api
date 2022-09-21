import React from 'react';

const Icon = ({ className, title, onClick }) => {
	return <i className={className} title={title} onClick={onClick} />;
};

export default Icon;
