import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { Spin, Row, BackTop } from 'antd';

import getPosts from '../services/getPosts';
import Post from '../components/Post';

const PostsContainer = styled.div`
	@media (min-width: 640px) {	
		padding-top: 50px;
	}
`;

const Loader = () => (
	<Row
		type="flex"
		justify="center"
		align="middle"
		style={{ height: 200, width: '100vw' }}
	>
		<Spin size="large" />
	</Row>
)

const GalleryView = (props) => {
	const { subreddits, sort, settings } = props;

	const { order, time } = sort;
	const { showNSFW, showThumbnails } = settings;
	
	const [posts, setPosts] = useState();
	const [loading, setLoading] = useState(false);
	
	const getMorePosts = async () => {
		if (!loading && posts) {
			const newPosts = await posts.fetchMore({ amount: 100 });
			await setPosts(newPosts);
		}
	}

	useEffect(() => {
		const getPostsAsync = async () => {
			setLoading(true);
			const posts = await getPosts({ subreddits, order, time });
			setPosts(posts);
			setLoading(false);
		}
		getPostsAsync();
	}, [order, subreddits, time]);

	return (
		<PostsContainer>
			<InfiniteScroll
				pageStart={0}
				loadMore={getMorePosts}
				hasMore={true || false}
				threshold={5000}
				loader={<Loader />}
			>	
				{!loading ? (
						<Masonry>
							{posts ? posts.map((post) => {
								if (!showNSFW && post.over_18 === true) return null;
								return (
									<Post
										key={post.permalink}
										post={post}
										showThumbs={showThumbnails}
									/>)
							}) : <Loader />}
						</Masonry>
					) : null
				}
				<BackTop />
			</InfiniteScroll>
		</PostsContainer>
	)
}
export default GalleryView;
