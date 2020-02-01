import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Icon, Modal } from 'antd'

const { Meta } = Card;

const Post = ({ post, showThumbs, blur }: { post: any, showThumbs?: boolean, blur?: boolean }) => {
	const { permalink, title, subreddit_name_prefixed, url, thumbnail } = post;
	const [previewVisible, setPreviewVisible] = useState(false);
	const image = showThumbs ? thumbnail : url;
	const redditUrl = 'https://reddit.com';
	const redditLink = `${redditUrl}${permalink}`;

	return (
		<PostCard
			hoverable
			cover={
				<ImageContainer
					onClick={() => setPreviewVisible(true)}
				>
					<Image alt={title} src={image} blur={blur} />
				</ImageContainer>
			}
		>
			<Meta
				title={
					<a href={redditLink} target="_blank" rel="noopener noreferrer">
						<Icon type="link" /> {title}
					</a>
				}
				description={subreddit_name_prefixed}
			/>
			<Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
				<a
					href={image}
					target="_blank"
					rel="noopener noreferrer"
					style={{ display: 'flex' }}
				>
					<img alt="example" src={image} style={{ maxWidth: '100%' }} />
				</a>
			</Modal>
		</PostCard>
	);
}

export default Post;

// Styles

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
	${(props: {blur?: boolean}) => props.blur ? 'filter: blur(40px);' : ''}
`;