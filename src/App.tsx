import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

import AppMenu from './modules/AppMenu';
import GalleryView from './modules/GalleryView';

import { Order, Time } from './services/getPosts';
import { defaultSubreddits } from './utils/subredditsTree';

const App: React.FC = () => {
	const [subreddits, setSubreddits]= useState(defaultSubreddits);
	const [showNSFW, setShowNSFW]= useState(true);
	const [showThumbnails, setShowThumbnails]= useState(false);
	const [order, setOrder]: [Order, any] = useState("hot")
	const [time, setTime]: [Time, any] = useState("day");

	const stateProps = {
		subreddits, setSubreddits,
		showNSFW, setShowNSFW,
		order, setOrder,
		time, setTime,
		showThumbnails, setShowThumbnails,
	}

  return (
    <div className="App">
		<AppMenu {...stateProps} />
		<GalleryView {...stateProps} />
    </div>
  );
}

export default App;
