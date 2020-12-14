const SET_COLOR = 'palette/SET_COLOR';

export const setColor = payload => ({ type: SET_COLOR, payload });

const initialState = {
  layout: {
    outer: 'gray',
    layoutBorder1: 'black',
    layoutBg1: '#a9d2d9',
    layoutBorder2: '#fff',
    layoutBg2: 'lightgray',
    cardBorder: '#a5a5a5',
    cardBg: '#fff',
    mainColor: '#238db3',
    headerColor: '#333',
    textColor: '#07698c',
  },
  component: {
    priority: '#e03131',
    important: '#3b5bdb',
    notice: '#fcc419',
  }
};

export default function palette(state = initialState, action) {
  switch (action.type) {
    case SET_COLOR:
      const { key, value } = action.payload;
      return {
        ...state,
        layout: {
          ...state.layout,
          [key]: value,
        },
      };
    default:
      return state;
  }
}
