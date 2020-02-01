import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

import AppMenu from './modules/AppMenu';
import GalleryView from './modules/GalleryView';
import store from './redux/store';
import checkVersion from './services/checkVersion';

const App: React.FC = () => {
	useEffect(() => {
		checkVersion();
	}, [])
  return (
	  <Provider store={store} >
		<AppMenu />
		<GalleryView />
	  </Provider>
  );
}

export default App;
