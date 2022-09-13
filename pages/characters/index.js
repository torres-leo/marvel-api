import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AsyncSelect from 'react-select/async';
import Input from '/components/Input';
import CharacterCard from '../../components/Character';
import axiosClient from '../../config/axios';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '/components/Button';
import Icon from '../../components/Icon';

const Characters = ({ characters }) => {
	const [listCharacters, setListCharacters] = useState(characters);
	// const [listCharacters, setListCharacters] = useState([]);
	const [page, setPage] = useState(1);
	const [inputValue, setInputValue] = useState('');
	const [inputSelect, setInputSelect] = useState('');
	const [selectedValue, setSelectedValue] = useState(null);
	const [active, setActive] = useState('Name');

	// let offset = 0;
	// let newCharacters = [];
	// const loadMoreCharacters = async () => {
	// 	const { data } = await axiosClient('/characters', { params: { limit: 20, offset: `${offset}` } });
	// 	const newCharacters = [];
	// 	const newCharactersRender = data?.data.results;
	// 	newCharactersRender?.forEach((ch) => newCharacters.push(ch));
	// 	setListCharacters((prevState) => [...prevState, ...newCharacters]);
	// 	offset += 10;
	// };

	// const handleScroll = (e) => {
	// 	if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
	// 		loadMoreCharacters();
	// 	}
	// };

	// useEffect(() => {
	// 	loadMoreCharacters();
	// 	window.addEventListener('scroll', handleScroll);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// useEffect(() => {
	// 	setListCharacters(characters);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [active]);

	useEffect(() => {
		const loadCharactersComic = async () => {
			if (active === 'Comics') {
				if (selectedValue) {
					const id = Number(selectedValue?.value);
					const { data } = await axiosClient(`/comics/${id}/characters`);
					const comicCharacters = data?.data.results;
					setListCharacters((prevState) => (prevState = comicCharacters));
				} else {
					setListCharacters((prevState) => (prevState = characters));
				}
			}
		};
		loadCharactersComic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);

	useDebounce(
		() => {
			const search = async (e) => {
				let params = {};
				if (inputValue.length) {
					params = { nameStartsWith: inputValue };
				}

				const { data } = await axiosClient(`/characters`, {
					params,
				});
				const character = data.data.results;
				setListCharacters((prevState) => (prevState = character));
			};
			search();
		},
		800,
		[inputValue]
	);

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleClick = (name) => () => {
		setActive(name);
		setInputValue('');
		setInputSelect('');
		setSelectedValue((prevState) => (prevState = null));
	};

	const handleInputSelect = (value) => {
		setInputSelect(value);
	};

	const handleChangeSelect = (value) => {
		setSelectedValue(value);
	};

	const loadOptions = async (inputSelect, callback) => {
		let params = {};

		if (inputSelect.length) {
			params = { titleStartsWith: inputSelect, limit: 30 };
		}
		const { data } = await axiosClient('/comics', { params });
		const searchedComic = data.data.results;
		callback(searchedComic.map((comic) => ({ label: `${comic.title}`, value: `${comic.id}` })));
	};

	const renderCharacters = () => {
		if (!listCharacters?.length && selectedValue)
			return (
				<div className='NotFound'>
					<p className='text'>This comic has no characters</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);

		if (!listCharacters?.length)
			return (
				<div className='NotFound'>
					<p className='text'>Character not Found</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);

		return listCharacters?.map((character) => <CharacterCard key={character.id} character={character} />);
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
							className={`Characters-input ${active === 'Name' ? 'activeInput' : ''}`}
							placeholder={`${active === 'Name' && 'Find character by name..'}`}
							onChange={handleChange}
						/>

						<AsyncSelect
							isClearable
							value={selectedValue}
							placeholder={'Search a comic and see all characters appereance..'}
							loadOptions={loadOptions}
							onInputChange={handleInputSelect}
							onChange={handleChangeSelect}
							className={`select ${active === 'Comics' ? 'activeInput' : ''}`}
						/>
					</form>
					<Button className={`Button ${active === 'Name' ? 'active' : ''}`} onClick={handleClick('Name')}>
						Name
					</Button>
					<Button className={`Button ${active === 'Comics' ? 'active' : ''}`} onClick={handleClick('Comics')}>
						Comics
					</Button>
				</div>
				{/* <InfiniteScroll dataLength={listCharacters.length} hasMore={true} next={(prevPage) => prevPage + 1}> */}
				<div className='Characters-list'>{renderCharacters()}</div>
				{/* </InfiniteScroll> */}
			</div>
		</div>
	);
};

export default Characters;
