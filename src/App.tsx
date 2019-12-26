import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

import AppMenu from './modules/AppMenu';
import GalleryView from './modules/GalleryView';

import { defaultSubreddits } from './utils/subredditsTree';

const defaultFilters = {
	subreddits: defaultSubreddits,
	order: 'hot',
	time: 'day',
}

const App: React.FC = () => {
	const [filters, setFilters] = useState(defaultFilters);
	const [settings, setSettings] = useState({
		blurNSFW: true,
		showNSFW: true,
		showThumbnails: false,
	});

  return (
    <div className="App">
		<AppMenu
			filters={filters}
			setFilters={setFilters}
			settings={settings}
			setSettings={setSettings}
		/>
		<GalleryView
			filters={filters}
			settings={settings}
		/>
    </div>
  );
}

export default App;
