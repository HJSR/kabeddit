import React, { useState } from 'react';
import AppMenu from './modules/AppMenu';
import 'antd/dist/antd.css';
import { Order, Time } from './services/getPosts';
import { defaultSubreddits } from './utils/subredditsTree';
import GalleryView from './modules/GalleryView';

const App: React.FC = () => {
	const [subreddits, setSubreddits]= useState(defaultSubreddits);
	const [showNSFW, setShowNSFW]= useState(false);
	const [onlyNSFW, setOnlyNSFW] = useState(false);
	const [order, setOrder]: [Order, any] = useState("hot")
	const [time, setTime]: [Time, any] = useState("day");

	const stateProps = {
		subreddits, setSubreddits,
		showNSFW, setShowNSFW,
		onlyNSFW, setOnlyNSFW,
		order, setOrder,
		time, setTime,
	}

  return (
    <div className="App">
		<AppMenu {...stateProps} />
		<GalleryView {...stateProps} />
    </div>
  );
}

export default App;
