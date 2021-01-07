const SET_COLOR = 'palette/SET_COLOR';

export const setColor = payload => ({ type: SET_COLOR, payload });

const initialState = {
  bg: {
    title: '배경',
    color: 'gray',
  },
  layoutBorder1: {
    title: '바깥 테두리',
    color: 'black',
  },
  layoutBg1: {
    title: '바깥(1) 영역',
    color: '#a9d2d9',
  },
  layoutBorder2: {
    title: '점선 테두리',
    color: '#fff',
  },
  layoutBg2: {
    title: '바깥(2) 영역',
    color: 'lightgray',
  },
  cardBorder: {
    title: '안쪽 테두리',
    color: '#a5a5a5',
  },
  cardBg: {
    title: '안쪽 영역',
    color: '#fff',
  },
  mainColor: {
    title: '메인 메뉴',
    color: '#238db3',
  },
  headerColor: {
    title: '미니포트폴리 타이틀',
    color: '#333',
  },
  textColor: {
    title: '서브페이지 메뉴',
    color: '#07698c',
  },
};

export default function palette(state = initialState, action) {
  switch (action.type) {
    case SET_COLOR:
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          color: value,
        },
      };
    default:
      return state;
  }
}
