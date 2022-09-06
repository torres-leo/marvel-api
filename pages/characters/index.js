import React from 'react';
import CharacterCard from '../../components/Character';

const Characters = ({ characters }) => {
	const renderCharacter = () =>
		characters.map((character) => <CharacterCard key={character.id} character={character} />);

	return (
		<div className='Characters'>
			<div className='Characters-container'>
				<h2 className='Characters-title'>
					<span>Characters</span>
				</h2>
				<div className='Characters-list'>{renderCharacter()}</div>
			</div>
		</div>
	);
};

export default Characters;
