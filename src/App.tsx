import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

import AppMenu from './modules/AppMenu';
import GalleryView from './modules/GalleryView';

import { defaultSubreddits } from './utils/subredditsTree';

const App: React.FC = () => {
	const [subreddits, setSubreddits]= useState(defaultSubreddits);
	const [settings, setSettings] = useState({
		showNSFW: true,
		showThumbnails: false,
	});
	const [sort, setSort] = useState({
		order: 'hot',
		time: 'day',
	});

	const stateProps = {
		subreddits, setSubreddits,
		settings, setSettings,
		sort, setSort,
	}

  return (
    <div className="App">
		<AppMenu {...stateProps} />
		<GalleryView {...stateProps} />
    </div>
  );
}

export default App;
