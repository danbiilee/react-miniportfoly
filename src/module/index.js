import { combineReducers } from 'redux';
import palette from './palette';
import playlist from './playlist';

const rootReducer = combineReducers({
  palette,
  playlist,
});

export default rootReducer;
