const SET_COLOR = 'palette/SET_COLOR';

export const setColor = payload => ({ type: SET_COLOR, payload });

const initialState = {
  layout: {
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
  },
  hex: {
    default: [
      '#e03131',
      '#d6336c',
      '#fd7e14',
      '#fab005',
      '#37b24d',
      '#15aabf',
      '#228be6',
      '#7048e8',
    ],
    humid: [
      '#ffc9c9',
      '#fcc2d7',
      '#ffd8a8',
      '#ffec99',
      '#b2f2bb',
      '#99e9f2',
      '#a5d8ff',
      '#d0bfff',
    ]
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
