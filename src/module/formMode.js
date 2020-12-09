const SET_FORM_MODE = 'formMode/SET_FORM_MODE';

export const setFormMode = payload => ({ type: SET_FORM_MODE, payload });

const initialState = false;

export default function formMode(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_MODE:
      return !state;
    default:
      return state;
  }
}
