const SET_CURSONG = 'playlist/SET_CURSONG';

export const setCurSong = payload => ({ type: SET_CURSONG, payload });

const initialState = {
  list: [
    '빅뱅(Bigbang) - CAFE',
    '빅뱅(Bigbang) - BLUE',
    '빅뱅(Bigbang) - 사랑먼지',
    '빅뱅(Bigbang) - BAD BOY',
  ],
  curSong: {
    idx: 0,
    title: '빅뱅(Bigbang) - CAFE',
    curTime: 0,
  },
};

export default function playlist(state = initialState, action) {
  switch (action.type) {
    case SET_CURSONG:
      return {
        ...state,
        curSong: {
          idx: action.payload.idx,
          title: action.payload.title,
          curTime: action.payload.curTime,
        },
      };
    default:
      return state;
  }
}
