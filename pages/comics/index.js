import React, { useState } from 'react';
import axiosClient from '../../config/axios';
import Layout from '../../components/Layout';
import ComicsCard from '../../components/Comics';
import Input from '/components/Input';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '/components/Button';

const Comics = ({ comics }) => {
	const [listComics, setListComics] = useState(comics);
	const [inputValue, setInputValue] = useState('');
	const [active, setActive] = useState('All');

	useDebounce(
		() => {
			const search = async () => {
				let params = {};
				if (inputValue.length) {
					if (active === 'All') {
						params = { titleStartsWith: inputValue };
					}
					const { data } = await axiosClient(`/comics`, {
						params,
					});
					setListComics(data.data.results);
				}
			};
			search();
		},
		800,
		[inputValue]
	);

	const handleClick = (name) => {
		setActive(name);
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const renderComics = () => listComics.map((comic) => <ComicsCard key={comic.id} comic={comic} />);
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
							placeholder='Find comics by title '
							onChange={handleChange}
						/>
					</form>
					<Button
						id='format'
						className={`Button ${active === 'All' ? 'active' : ''}`}
						onClick={() => handleClick('Format')}>
						All
					</Button>
					<Button
						id='format'
						className={`Button ${active === 'Format' ? 'active' : ''}`}
						onClick={() => handleClick('Format')}>
						Format
					</Button>
					<Button
						id='issue'
						className={`Button ${active === 'Issue' ? 'active' : ''}`}
						onClick={() => handleClick('Issue')}>
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
