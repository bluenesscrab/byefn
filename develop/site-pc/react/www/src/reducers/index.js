import {combineReducers} from 'redux';

import list from './list.js';
import calc from './calc.js';

export default combineReducers({
  list,
  calc
});