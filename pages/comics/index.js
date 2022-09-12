import React, { useEffect, useState } from 'react';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import ComicsCard from '../../components/Comics';
import Input from '/components/Input';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '/components/Button';
import Icon from '/components/Icon';

const Comics = ({ comics }) => {
	const [listComics, setListComics] = useState(comics);
	const [inputValue, setInputValue] = useState('');
	const [active, setActive] = useState('Title');
	const [error, setError] = useState('');

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
					params = { titleStartsWith: inputValue };

					if (active === 'Format') {
						params = { format: inputValue.trim() };
					}

					if (active === 'Issue') {
						params = { issueNumber: inputValue };
					}
				}
				const { data } = await axiosClient(`/comics`, {
					params,
				});

				const searchedComic = data.data.results;
				setListComics(searchedComic);
			};
			search();
		},
		800,
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

	const renderComics = () => {
		if (!listComics.length || error)
			return (
				<div className='NotFound'>
					<p className='text'>{error ? error : 'Comic not Found'}</p>
					<Icon className='fa-solid fa-circle-exclamation icon' />
				</div>
			);
		return listComics.map((comic) => <ComicsCard key={comic.id} comic={comic} />);
	};

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
				<div className='Comics-list'>{renderComics()}</div>
			</div>
		</div>
	);
};

Comics.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
	const { data } = await axiosClient('/comics');
	const comics = data.data.results;

	return {
		props: {
			comics,
		},
	};
}

export default Comics;
