import React, { useState } from 'react';
import Input from '/components/Input';
import CharacterCard from '../../components/Character';
import axiosClient from '../../config/axios';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '/components/Button';

const Characters = ({ characters }) => {
	const [listCharacters, setListCharacters] = useState(characters);
	const [inputValue, setInputValue] = useState('');
	const [active, setActive] = useState(false);

	useDebounce(
		() => {
			const search = async () => {
				let params = {};
				if (inputValue.length) {
					params = { nameStartsWith: inputValue };
				}
				const { data } = await axiosClient(`/characters`, {
					params,
				});

				setListCharacters(data.data.results);
			};
			search();
		},
		800,
		[inputValue]
	);

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const renderCharacters = () =>
		listCharacters.map((character) => <CharacterCard key={character.id} character={character} />);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<div className='Characters'>
			<div className='Characters-container'>
				<h2 className='Characters-title'>
					<span>Characters</span>
				</h2>
				<div className='Characters-search'>
					<label htmlFor='filter' className='Characters-label'>
						Filter Characters:
					</label>
					<form className='Characters-form'>
						<Input
							type='text'
							className='Characters-input'
							placeholder='Find character by name '
							onChange={handleChange}
						/>
					</form>
					<Button id='format' className='Button' onClick={handleClick}>
						Format
					</Button>
				</div>
				<div className='Characters-list'>{renderCharacters()}</div>
			</div>
		</div>
	);
};

export default Characters;
