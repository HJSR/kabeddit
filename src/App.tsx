import React from 'react';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

import AppMenu from './modules/AppMenu';
import GalleryView from './modules/GalleryView';
import store from './redux/store';

const App: React.FC = () => {
  return (
	  <Provider store={store} >
		<AppMenu />
		<GalleryView />
	  </Provider>
  );
}

export default App;
