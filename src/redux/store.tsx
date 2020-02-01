import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { reducer } from './duck';


const store = createStore(reducer, devToolsEnhancer(null));

export default store;