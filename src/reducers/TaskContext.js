import React, { useReducer, createContext, useContext, useRef } from 'react';
import { MdFace, MdSentimentNeutral } from 'react-icons/md';

const initialTasks = [
  {
    id: 1,
    title: 'Tasklist 페이지 마크업',
    isDone: true,
    tag: null,
    point: 1,
    chkList: [
      {
        id: 1,
        title: 'styled-components로 변경?',
        assignedMber: {
          mberNo: 1,
          mberId: 'danbi',
          mberNm: '이단비',
          profile: MdFace,
        },
        isDone: false,
        regMber: {
          mberNo: 1,
          mberId: 'danbi',
          mberNm: '이단비',
          profile: MdFace,
        },
        regDt: '2020-08-21',
        updMber: null,
        updDt: null,
      },
      {
        id: 2,
        title: '체크박스 보더 여백 없애기',
        assignedMber: {
          mberNo: 1,
          mberId: 'danbi',
          mberNm: '이단비',
          profile: MdFace,
        },
        isDone: true,
        regMber: {
          mberNo: 1,
          mberId: 'danbi',
          mberNm: '이단비',
          profile: MdFace,
        },
        regDt: '2020-08-21',
        updMber: null,
        updDt: null,
      },
    ],
    commentList: [
      {
        id: 1,
        contents: '뜨악!!!',
        regMber: {
          mberNo: 2,
          mberId: 'ash',
          mberNm: '애쉬',
          profile: MdSentimentNeutral,
        },
        regDt: '2020-08-23',
        updMber: null,
        updDt: null,
      },
    ],
    fileList: [],
    mberList: [
      {
        mberNo: 1,
        mberId: 'danbi',
        mberNm: '이단비',
        profile: MdFace,
      },
      {
        mberNo: 2,
        mberId: 'ash',
        mberNm: '애쉬',
        profile: MdSentimentNeutral,
      },
    ],
    stDt: '2020-08-20',
    endDt: null,
    finDt: '2020-09-04',
    regMber: {
      mberNo: 1,
      mberId: 'danbi',
      mberNm: '이단비',
      profile: MdFace,
    },
    regDt: '2020-08-21',
    updMber: {
      mberNo: 1,
      mberId: 'danbi',
      mberNm: '이단비',
      profile: MdFace,
    },
    updDt: '2020-09-02',
  },
  {
    id: 2,
    title: 'Task 상태관리',
    isDone: false,
    tag: 'priority',
    point: 5,
    chkList: [
      {
        id: 3,
        title: '시작하기!',
        assignedMber: {
          mberNo: 1,
          mberId: 'danbi',
          mberNm: '이단비',
          profile: MdFace,
        },
        isDone: false,
        regMber: {
          mberNo: 1,
          mberId: 'danbi',
          mberNm: '이단비',
          profile: MdFace,
        },
        regDt: '2020-09-02',
        updMber: null,
        updDt: null,
      },
    ],
    commentList: [],
    fileList: [],
    mberList: [
      {
        mberNo: 1,
        mberId: 'danbi',
        mberNm: '이단비',
        profile: MdFace,
      },
    ],
    stDt: '2020-09-02',
    endDt: '2020-09-03',
    finDt: null,
    regMber: {
      mberNo: 1,
      mberId: 'danbi',
      mberNm: '이단비',
      profile: MdFace,
    },
    regDt: '2020-08-21',
    updMber: null,
    updDt: null,
  },
  {
    id: 3,
    title: 'Tasklist 상태관리',
    isDone: false,
    tag: 'important',
    point: 3,
    chkList: [],
    commentList: [],
    fileList: [],
    mberList: [
      {
        mberNo: 2,
        mberId: 'ash',
        mberNm: '애쉬',
        profile: MdSentimentNeutral,
      },
    ],
    stDt: '2020-09-02',
    endDt: '2020-09-07',
    finDt: null,
    regMber: {
      mberNo: 2,
      mberId: 'ash',
      mberNm: '애쉬',
      profile: MdSentimentNeutral,
    },
    regDt: '2020-09-02',
    updMber: null,
    updDt: null,
  },
  {
    id: 4,
    title: '리덕스 공부하기',
    isDone: false,
    tag: 'notice',
    point: null,
    chkList: [],
    commentList: [],
    fileList: [],
    mberList: [],
    stDt: null,
    endDt: '2020-09-07',
    finDt: null,
    regMber: {
      mberNo: 2,
      mberId: 'ash',
      mberNm: '애쉬',
      profile: MdSentimentNeutral,
    },
    regDt: '2020-09-03',
    updMber: null,
    updDt: null,
  },
];

function taskReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.task);
    case 'TOGGLE':
      return state.map(task =>
        task.id === action.id
          ? {
              ...task,
              isDone: !task.isDone,
              finDt: task.isDone ? null : action.finDt,
            }
          : task,
      );
    case 'REMOVE':
      // 삭제되는 아이템 정보 업데이트는 못하는 건가???
      return state.filter(task => action.obj.id !== task.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TaskStateContext = createContext();
const TaskDispatchContext = createContext();
const TaskNextIdContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialTasks);
  const nextId = useRef(5);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        <TaskNextIdContext.Provider value={nextId}>
          {children}
        </TaskNextIdContext.Provider>
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTaskState() {
  const context = useContext(TaskStateContext);
  if (!context) {
    throw new Error('Cannot find TaskProvider');
  }
  return context;
}

export function useTaskDispatch() {
  const context = useContext(TaskDispatchContext);
  if (!context) {
    throw new Error('Cannot find TaskProvider');
  }
  return context;
}

export function useTaskNextId() {
  const context = useContext(TaskNextIdContext);
  if (!context) {
    throw new Error('Cannot find TaskProvider');
  }
  return context;
}
