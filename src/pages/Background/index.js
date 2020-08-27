import {compose, createStore} from 'redux';
import rootReducer from './reducers';
import persistState from 'redux-localstorage'

import {wrapStore} from 'webext-redux';

const enhancer = compose(
  persistState()
)

const store = createStore(rootReducer, {}, enhancer);

wrapStore(store);
