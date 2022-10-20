/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import { AsyncPaginate } from 'react-select-async-paginate';
import Input from '/components/Input';
import CharacterCard from '../../components/Character';
import axiosClient from '../../config/axios';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '/components/Button';
import Icon from '../../components/Icon';
import axiosAPI from '../../config/axiosAPI';

const Characters = ({ characters }) => {
	const [listCharacters, setListCharacters] = useState(characters);
	const [searchedCharacter, setSearchedCharacter] = useState([]);
	const [favoritesList, setFavoritesList] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [pages, setPages] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const [inputSelect, setInputSelect] = useState('');
	const [selectedValue, setSelectedValue] = useState(null);
	const [active, setActive] = useState('Name');
	const [error, setError] = useState('');
	const offset = 20;
	const pageLimit = 20;

	const isLogged = useSelector((state) => state.user.isLogged);
	const userToken = useSelector((state) => state.user.userToken);

	useEffect(() => {
		const loadCharactersComic = async () => {
			if (active === 'Comics' && selectedValue) {
				const id = Number(selectedValue?.value);
				const { data } = await axiosClient(`/comics/${id}/characters`);
				const comicCharacters = data.data.results;
				if (!comicCharacters.length) {
					setError('This comic has not characters to show');
				} else {
					setError('');
					setSearchedCharacter(comicCharacters);
				}
			} else {
				setError('');
				setSearchedCharacter([]);
			}
		};
		loadCharactersComic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue, inputSelect]);

	useDebounce(
		() => {
			const search = async () => {
				try {
					let params = {};
					const value = inputValue.trim();
					if (value) {
						params = { nameStartsWith: value, limit: 100 };
						const { data } = await axiosClient(`/characters`, {
							params,
						});
						const character = data.data.results;
						if (!character.length) {
							setError('Character(s) not Found');
						} else {
							setError('');
							setSearchedCharacter(character);
						}
					} else {
						setError('');
						setSearchedCharacter([]);
					}
				} catch (error) {
					return error;
				}
			};
			search();
		},
		800,
		[inputValue]
	);

	const handleChange = useCallback(
		(e) => {
			setInputValue(e.target.value);
		},
		[inputValue]
	);

	const handleClick = (name) => () => {
		setActive(name);
		setInputValue('');
		setInputSelect('');
		setSelectedValue(null);
	};

	const handleInputSelect = useCallback(
		(value) => {
			setInputSelect(value);
		},
		[inputSelect]
	);

	const handleChangeSelect = useCallback(
		(value) => {
			setSelectedValue(value);
		},
		[selectedValue]
	);

	const sleep = (ms) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, ms);
		});

	// const load = useDebounce(() => {

	// }, loadOptions(), 800, [inputSelect]);

	const loadOptions = async (inputSelect, callback) => {
		try {
			let params = {};
			const value = inputSelect.trim();
			if (value) {
				params = { titleStartsWith: value, limit: 50 };
			}

			const { data } = await axiosClient('/comics', { params });
			const searchedComic = data.data.results;
			callback(searchedComic.map((comic) => ({ label: `${comic.title}`, value: `${comic.id}` })));
		} catch (error) {
			return error;
		}
	};

	const getMoreCharacters = useCallback(() => {
		setPages((prevState) => prevState + 1);
	}, []);

	useEffect(() => {
		if (!pages) return;
		const getInfoCharacters = async () => {
			try {
				let params = { limit: pageLimit, offset: offset * pages };
				const { data } = await axiosClient(`/characters`, {
					params,
				});
				const getCharacters = data.data.results;
				setListCharacters((prevState) => [...prevState, ...getCharacters]);
				setHasMore(listCharacters.length <= data.data.total);
			} catch (error) {
				return error;
			}
		};
		getInfoCharacters();
		//eslint-disable-next-line
	}, [pages]);

	const getCharactersFavorites = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userToken}`,
				},
			};
			const { data } = await axiosAPI('/favorites', {
				params: { category: 'CHARACTER' },
				...config,
			});
			setFavoritesList(data);
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		if (isLogged) {
			getCharactersFavorites();
		}
		//eslint-disable-next-line
	}, []);

	const renderSearchedCharacter = useMemo(() => {
		if (error)
			return (
				<div className='NotFound'>
					<p className='text'>{error}</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);

		return searchedCharacter.map((character) => (
			<CharacterCard
				key={character.id}
				character={character}
				favoritesList={favoritesList}
				getCharactersFavorites={getCharactersFavorites}
			/>
		));
	}, [error, searchedCharacter, favoritesList, getCharactersFavorites]);

	const renderCharacters = useMemo(() => {
		if (error)
			return (
				<div className='NotFound'>
					<p className='text'>{error}</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);

		return listCharacters.map((character) => (
			<CharacterCard
				key={character.id}
				character={character}
				favoritesList={favoritesList}
				getCharactersFavorites={getCharactersFavorites}
			/>
		));
	}, [error, listCharacters, favoritesList, getCharactersFavorites]);

	const renderData = useMemo(() => {
		if (!searchedCharacter.length)
			return (
				<InfiniteScroll dataLength={listCharacters.length} hasMore={hasMore} next={getMoreCharacters}>
					<div className='Characters-list'>{renderCharacters}</div>
				</InfiniteScroll>
			);

		return <div className='Characters-list'>{renderSearchedCharacter}</div>;
	}, [searchedCharacter, listCharacters, favoritesList, getCharactersFavorites]);

	const customClass = (value) => {
		switch (value) {
			case 'Name':
				break;
			case 'Comics':
				break;

			default:
				break;
		}
		if (active === value) return 'activeInput';
	};

	return (
		<div className='Characters'>
			<div className='Characters-container'>
				<h2 className='Characters-title'>
					<span>Characters</span>
				</h2>
				<div className='Characters-search'>
					<form className='Characters-form'>
						<label htmlFor='filter' className='Characters-label'>
							Filter Characters:
						</label>
						<Input
							type='text'
							// className={`Characters-input ${active === 'Name' ? 'activeInput' : ''}`}
							className={`Characters-input ${customClass('Name')}`}
							placeholder={`${active === 'Name' && 'Find character by name..'}`}
							onChange={handleChange}
						/>

						<AsyncSelect
							isClearable
							value={selectedValue}
							placeholder={'Search a comic and see all characters appereance..'}
							loadOptions={loadOptions}
							// loadOptions={load}
							onInputChange={handleInputSelect}
							onChange={handleChangeSelect}
							className={`select ${active === 'Comics' ? 'activeInput' : ''}`}
						/>
						{/* <AsyncPaginate
							debounceTimeout={300}
							value={selectedValue}
							loadOptions={loadOptions}
							onChange={handleChangeSelect}
							onInputChange={handleInputSelect}
							className={`select ${active === 'Comics' ? 'activeInput' : ''}`}
							placeholder={'Search a comic and see all characters appereance..'}
						/> */}
					</form>
					<div className='Characters-filters'>
						<Button className={`Button ${active === 'Name' && 'active'}`} onClick={handleClick('Name')}>
							Name
						</Button>
						<Button className={`Button ${active === 'Comics' && 'active'}`} onClick={handleClick('Comics')}>
							Comics
						</Button>
					</div>
				</div>
				{renderData}
			</div>
		</div>
	);
};

export default Characters;
