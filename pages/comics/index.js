/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import ComicsCard from '../../components/Comics';
import Input from '/components/Input';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '/components/Button';
import Icon from '/components/Icon';
import axiosAPI from '../../config/axiosAPI';

const Comics = ({ comics }) => {
	const [listComics, setListComics] = useState(comics);
	const [searchedComic, setSearchedComic] = useState([]);
	const [favoritesList, setFavoritesList] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [pageLimit, setPageLimit] = useState(20);
	const [pages, setPages] = useState(0);
	const [offset, setOffset] = useState(20);
	const [inputValue, setInputValue] = useState('');
	const [active, setActive] = useState('Title');
	const [error, setError] = useState('');

	const isLogged = useSelector((state) => state.user.isLogged);
	const userToken = useSelector((state) => state.user.userToken);

	useEffect(() => {
		if (active === 'Issue') {
			if (isNaN(inputValue)) return setError('Must be a number');
		}
		setError('');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	useDebounce(
		() => {
			const search = async () => {
				if (error) return;
				let params = {};
				if (inputValue.length) {
					params = { titleStartsWith: inputValue, limit: 50 };

					if (active === 'Format') {
						params = { format: inputValue.trim(), limit: 100 };
					}

					if (active === 'Issue') {
						params = { issueNumber: inputValue, limit: 100 };
					}
					const { data } = await axiosClient(`/comics`, {
						params,
					});
					const searchedComic = data.data.results;
					if (!searchedComic.length) {
						setError('Comic Not Found');
					} else {
						setError('');
						setSearchedComic(searchedComic);
					}
				} else {
					setError('');
					setSearchedComic([]);
				}
			};
			search();
		},
		200,
		[inputValue]
	);

	const handleClick = (name) => {
		setError('');
		setActive(name);
		setInputValue('');
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const getMoreComics = () => {
		setPages((prevState) => prevState + 1);
	};

	useEffect(() => {
		if (!pages) return;
		const getInfoCharacters = async () => {
			let params = { limit: pageLimit, offset: offset * pages };
			const { data } = await axiosClient(`/comics`, {
				params,
			});
			const getComics = data.data.results;
			setListComics((prevState) => [...prevState, ...getComics]);
			setHasMore(listComics.length <= data.data.total);
		};
		getInfoCharacters();
		//eslint-disable-next-line
	}, [pages]);

	const renderSearchedComic = () => {
		if (error)
			return (
				<div className='NotFound'>
					<p className='text'>{error}</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);

		return searchedComic.map((comic) => (
			<ComicsCard key={uuidv4()} comic={comic} getComicsFavorites={getComicsFavorites} favoritesList={favoritesList} />
		));
	};

	const renderComics = () => {
		if (error)
			return (
				<div className='NotFound'>
					<p className='text'>{error}</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);
		return listComics.map((comic) => (
			<ComicsCard key={uuidv4()} comic={comic} getComicsFavorites={getComicsFavorites} favoritesList={favoritesList} />
		));
	};

	const getComicsFavorites = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`,
			},
		};
		const { data } = await axiosAPI('/favorites', {
			params: { category: 'COMIC' },
			...config,
		});
		setFavoritesList(data);
	};

	useEffect(() => {
		if (isLogged) {
			getComicsFavorites();
		}
	}, []);

	return (
		<div className='Comics'>
			<div className='Comics-container'>
				<h2 className='Comics-title'>
					<span>COMICS</span>
				</h2>
				<div className='Comics-search'>
					<label htmlFor='filter' className='Comics-label'>
						Filter Comics:
					</label>
					<form className='Comics-form'>
						<Input
							id='filter'
							type='text'
							className='Comics-input'
							placeholder={`${
								active === 'Format'
									? 'Try with: Comic, Magazine, Graphic Novel, Digital Comic, hardcover, etc..'
									: active === 'Issue'
									? 'Find comics by Issue Number..'
									: 'Find comics by Title..'
							}`}
							onChange={handleChange}
							value={inputValue}
						/>
					</form>
					<div className='Comics-filters'>
						<Button
							id='title'
							className={`Button ${active === 'Title' ? 'active' : ''}`}
							onClick={() => handleClick('Title')}
						>
							Title
						</Button>
						<Button
							id='format'
							className={`Button ${active === 'Format' ? 'active' : ''}`}
							onClick={() => handleClick('Format')}
						>
							Format
						</Button>
						<Button
							id='issue'
							className={`Button ${active === 'Issue' ? 'active' : ''}`}
							onClick={() => handleClick('Issue')}
						>
							Issue
						</Button>
					</div>
				</div>
				<>
					{!searchedComic.length ? (
						<InfiniteScroll dataLength={listComics.length} hasMore={hasMore} next={getMoreComics}>
							<div className='Comics-list'>{renderComics()}</div>
						</InfiniteScroll>
					) : (
						<div className='Comics-list'>{renderSearchedComic()}</div>
					)}
				</>
			</div>
		</div>
	);
};

Comics.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
	const { data } = await axiosClient('/comics', { params: { limit: 20, offset: 0 } });
	const comics = data.data.results;

	return {
		props: {
			comics,
		},
	};
}

export default Comics;
