import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import Input from '/components/Input';
import CharacterCard from '../../components/Character';
import axiosClient from '../../config/axios';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '/components/Button';

const Characters = ({ characters }) => {
	const [listCharacters, setListCharacters] = useState(characters);
	const [inputValue, setInputValue] = useState('');
	const [inputSelect, setInputSelect] = useState('');
	const [comics, setComics] = useState([]);
	const [selectedValue, setSelectedValue] = useState(null);
	const [active, setActive] = useState('Name');
	// const [activeSelect, setActiveSelect] = useState(false);

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

	// useDebounce(
	// 	() => {
	// 		const searchComic = async () => {
	// 			let params = {};
	// 			if (inputSelect.length) {
	// 				params = { titleStartsWith: inputSelect };
	// 			}
	// 			const { data } = await axiosClient(`/comics`, {
	// 				params,
	// 			});

	// 			setComics(data.data.results);
	// 		};
	// 		searchComic();
	// 	},
	// 	800,
	// 	[inputSelect]
	// );

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const renderCharacters = () =>
		listCharacters.map((character) => <CharacterCard key={character.id} character={character} />);

	const handleClick = (name) => () => {
		setActive(name);
		setInputValue('');
	};

	// handle input change event
	const handleInputSelect = (value) => {
		setInputSelect(value);
	};
	// handle selection
	const handleChangeSelect = (value) => {
		setSelectedValue(value);
	};

	const loadOptions = async (inputSelect, callback) => {
		const { data } = await axiosClient('/comics');
		const searchedComic = data.data.results;
		// setComics(searchedComic);

		callback(searchedComic.map((comic) => ({ label: `${comic.title}`, value: `${comic.id}` })));
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
							placeholder={`${active === 'Name' ? 'Find character by name' : 'Find characters by comics'}`}
							onChange={handleChange}
						/>

						<AsyncSelect
							isClearable
							value={selectedValue}
							placeholder={'Search a Comic'}
							loadOptions={loadOptions}
							onInputChange={handleInputSelect}
							onChange={handleChangeSelect}
						/>
					</form>
					<Button id='name' className={`Button ${active === 'Name' ? 'active' : ''}`} onClick={handleClick('Name')}>
						Name
					</Button>
					<Button
						id='comics'
						className={`Button ${active === 'Comics' ? 'active' : ''}`}
						onClick={handleClick('Comics')}>
						Comics
					</Button>
				</div>
				<div className='Characters-list'>{renderCharacters()}</div>
			</div>
		</div>
	);
};

export default Characters;
