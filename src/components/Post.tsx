import React from 'react'
import styled from 'styled-components'
import { Card } from 'antd'

const { Meta } = Card;

const PostCard = styled(Card)`
	width: 50%;
	@media (min-width: 1280px) {
		width: 25%;
	}

	.ant-card-body {
		position: static;
		background: white;
		transition: all 0.15s;
		@media (min-width: 769px) {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			opacity: 0;
			box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.09);
		}
	}
	&:hover {
		.ant-card-body {
			opacity: 1;
		}
	}
`;
const ImageContainer = styled.a``;
const Image = styled.img`
	width: 100%;
	margin: 0 auto;	
`;

const Post = ({ post, showThumbs }: { post:any ,showThumbs?: boolean}) => {
	const { permalink, title, subreddit_name_prefixed, url, thumbnail } = post;
	const image = showThumbs ? thumbnail : url;
	const redditUrl = 'https://reddit.com';
	const redditLink = `${redditUrl}${permalink}`;

	return (
		<PostCard
			hoverable
			cover={
				<ImageContainer href={image} download="title" target="_blank" rel="noopener noreferrer">
					<Image alt={title} src={image} />
				</ImageContainer>
			}
		>
			<Meta
				title={
					<a href={redditLink} target="_blank" rel="noopener noreferrer">
						{title}
					</a>
				}
				description={subreddit_name_prefixed}
			/>
		</PostCard>
	);
}

export default Post