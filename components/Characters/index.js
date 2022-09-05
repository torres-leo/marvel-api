import React, { useEffect, useState } from 'react';
import Character from './Character';

const Characters = ({ characters }) => {
	const renderCharacter = () => characters.map((character) => <Character key={character.id} character={character} />);
	return (
		<div className='Characters'>
			<div className='Characters-container'>
				<div className='Characters-title'>Characters</div>
				<div className='Characters-list'>{renderCharacter()}</div>
			</div>
		</div>
	);
};

export default Characters;
