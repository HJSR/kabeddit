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

const GalleryView = (props) => {
	const { subreddits, order, time, showNSFW, showThumbnails } = props;
	const [posts, setPosts] = useState();
	const [loading, setLoading] = useState(false);
	
	const getMorePosts = async () => {
		if (!loading && posts) {
			await setLoading(true);
			const newPosts = await posts.fetchMore({ amount: 100 });
			await setPosts(newPosts);
			await setLoading(false);
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
				loader={
					<Row
						type="flex"
						justify="center"
						align="middle"
						style={{ height: 200 }}
					>
						<Spin size="large" />
					</Row>
				}
			>
				<Masonry>
					{posts ? posts.map((post) => {
						if (!showNSFW && post.over_18 === true) return null;
						return (
							<Post	
								key={post.permalink}
								post={post}
								showThumbs={showThumbnails}
							/>)
					}): null}
				</Masonry>
				<BackTop />
			</InfiniteScroll>
		</PostsContainer>
	)
}
export default GalleryView;
