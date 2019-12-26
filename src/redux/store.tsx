import { createStore } from 'redux'
import { reducer } from './duck';

const store = createStore(reducer);

export default store;