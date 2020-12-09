import { combineReducers } from 'redux';
import palette from './palette';
import formMode from './formMode';
import boards from './boards';
import tasklists from './tasklists';
import layout from './layout';

const rootReducer = combineReducers({
  palette,
  layout,
  formMode,
  boards,
  tasklists,
});

export default rootReducer;
