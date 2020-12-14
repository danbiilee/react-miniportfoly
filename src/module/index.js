import { combineReducers } from 'redux';
import palette from './palette';
import formMode from './formMode';
import boards from './boards';
import tasklists from './tasklists';

const rootReducer = combineReducers({
  palette,
  formMode,
  boards,
  tasklists,
});

export default rootReducer;
