import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import StoryCard from '../../components/Stories';

const Stories = ({ stories }) => {
	const [storiesList, setStoriesList] = useState(stories);
	const [hasMore, setHasMore] = useState(true);
	const [pageLimit, setPageLimit] = useState(20);
	const [pages, setPages] = useState(0);
	const [offset, setOffset] = useState(20);

	const getMoreStories = () => {
		setPages((prevState) => prevState + 1);
	};

	useEffect(() => {
		if (!pages) return;
		const getInfoStories = async () => {
			let params = { limit: pageLimit, offset: offset * pages };
			const { data } = await axiosClient(`/stories`, {
				params,
			});
			const getStories = data.data.results;
			setStoriesList((prevState) => [...prevState, ...getStories]);
			setHasMore(storiesList.length <= data.data.total);
		};
		getInfoStories();
		//eslint-disable-next-line
	}, [pages]);

	const renderStories = () => storiesList?.map((story) => <StoryCard key={uuidv4()} story={story} />);
	return (
		<div className='Stories'>
			<div className='Stories-container'>
				<div className='Stories-title'>Stories</div>
				<InfiniteScroll dataLength={storiesList.length} hasMore={hasMore} next={getMoreStories}>
					<div className='Stories-list'>{renderStories()}</div>
				</InfiniteScroll>
			</div>
		</div>
	);
};

Stories.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
	const { data } = await axiosClient('/stories', { params: { limit: 20, offset: 0 } });
	const stories = data.data.results;

	return {
		props: {
			stories,
		},
	};
}

export default Stories;
