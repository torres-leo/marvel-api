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
	const [hasMore, setHasMore] = useState(true);
	const [pageLimit, setPageLimit] = useState(20);
	const [pages, setPages] = useState(0);
	const [offset, setOffset] = useState(20);
	const [inputValue, setInputValue] = useState('');
	const [inputSelect, setInputSelect] = useState('');
	const [selectedValue, setSelectedValue] = useState(null);

	const [active, setActive] = useState('Name');

	useEffect(() => {
		const loadCharactersComic = async () => {
			if (active === 'Comics' && selectedValue) {
				const id = Number(selectedValue?.value);
				const { data } = await axiosClient(`/comics/${id}/characters`);
				const comicCharacters = data.data.results;
				setListCharacters((prevState) => (prevState = comicCharacters));
			} else {
				setListCharacters((prevState) => (prevState = characters));
			}
		};
		loadCharactersComic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);

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

	const getMoreCharacters = () => {
		setPages((prevState) => prevState + 1);
	};

	useEffect(() => {
		if (!pages) return;
		const getInfoCharacters = async () => {
			let params = { limit: pageLimit, offset: offset * pages };
			const { data } = await axiosClient(`/characters`, {
				params,
			});
			const getCharacters = data.data.results;
			setListCharacters((prevState) => [...prevState, ...getCharacters]);
			setHasMore(listCharacters.length <= data.data.total);
		};
		getInfoCharacters();
		//eslint-disable-next-line
	}, [pages]);

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
				<InfiniteScroll dataLength={listCharacters.length} hasMore={hasMore} next={getMoreCharacters}>
					<div className='Characters-list'>{renderCharacters()}</div>
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default Characters;
