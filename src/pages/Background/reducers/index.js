import {combineReducers} from 'redux';

import count from './count';
import data from './data';
export default combineReducers({
  count, data
});
