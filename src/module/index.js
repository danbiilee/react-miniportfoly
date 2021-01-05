import { combineReducers } from 'redux';
import palette from './palette';
import playlist from './playlist';
import tasklists from './tasklists';

const rootReducer = combineReducers({
  palette,
  playlist,
  tasklists,
});

export default rootReducer;
