import React, { useState, useEffect } from 'react';
import AppMenu from './modules/AppMenu';
import 'antd/dist/antd.css';
import getPosts, { Order, Time } from './services/getPosts';
import { defaultSubreddits } from './utils/subredditsTree';

const App: React.FC = () => {
	const [posts, setPosts]= useState([]);
	const [subreddits, setSubreddits]= useState(defaultSubreddits);
	const [showNSFW, setShowNSFW]= useState(false);
	const [onlyNSFW, setOnlyNSFW] = useState(false);
	const [order, setOrder]: [Order, any] = useState("hot")
	const [time, setTime]: [Time, any] = useState("day");

	useEffect(() => {
		const getPostsAsync = async () => {
			const posts = await getPosts({ subreddits, order, time });
			setPosts(posts);
		}
		getPostsAsync();
	}, [time, order, onlyNSFW, showNSFW, subreddits]);

  return (
    <div className="App">
	  <AppMenu 
			subreddits={subreddits} setSubreddits={setSubreddits}
			order={order} setOrder={setOrder}
			onlyNSFW={onlyNSFW} setOnlyNSFW={setOnlyNSFW}
			showNSFW={showNSFW} setShowNSFW={setShowNSFW}
			time={time} setTime={setTime}
	  />
	<div>{JSON.stringify(posts)}</div>
    </div>
  );
}

export default App;
