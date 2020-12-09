const SET_LAYOUT = 'layout/SET_LAYOUT';

export const setLayout = payload => ({ type: SET_LAYOUT, payload });

const initialState = {};

export default function layout(state = initialState, action) {
  switch (action.type) {
    case SET_LAYOUT:
      const { key, value } = action.payload;
      return  state[key] ? { ...state } : { ...state, [key]: value}; 
    default:
      return state;
  }
}
