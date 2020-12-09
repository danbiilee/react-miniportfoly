import * as api from '../api/boards';
import {
  stateUtils,
  handleAsyncActions,
  createPromiseThunk,
} from '../lib/asyncUtils';

// Board 목록 전체 조회
const GET_BOARDS_ALL = 'boards/GET_BOARDS_ALL';
const GET_BOARDS_ALL_SUCCESS = 'boards/GET_BOARDS_ALL_SUCCESS';
const GET_BOARDS_ALL_ERROR = 'boards/GET_BOARDS_ALL_ERROR';

const initialState = {
  boards: stateUtils.initial(),
  board: {},
};

export const getBoardsAll = createPromiseThunk(GET_BOARDS_ALL, api.getBoards);

export default function boards(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS_ALL:
    case GET_BOARDS_ALL_SUCCESS:
    case GET_BOARDS_ALL_ERROR:
      const reducer = handleAsyncActions(GET_BOARDS_ALL, 'boards', true);
      return reducer(state, action);
    //return handleAsyncActions(GET_BOARDS_ALL, 'boards', true)(state, action);
    default:
      return state;
  }
}
