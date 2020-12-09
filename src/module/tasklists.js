// id값
let tasklistId = 0; // ADD_TASKLIST
let taskId = 0; // ADD_TASK
let checklistId = 0; // ADD_CHECKLIST

// 업무리스트
const ADD_TASKLIST = 'tasklist/ADD_TASKLIST';
const DEL_TASKLIST = 'tasklist/DEL_TASKLIST';
const CHANGE_TASKLIST_TITLE = 'tasklist/CHANGE_TASKLIST_TITLE';
//업무
const SET_TASK = 'tasklist/SET_TASK';
const CLEAR_TASK = 'tasklist/CLEAR_TASK';
const ADD_TASK = 'tasklist/ADD_TASK';
const DEL_TASK = 'tasklist/DEL_TASK';
const TOGGLE_TASK = 'tasklist/TOGGLE_TASK';
const CHANGE_TASK_TITLE = 'tasklist/CHANGE_TASK_TITLE';
const CHANGE_TASK_SETTINGS = 'tasklist/CHANGE_TASK_SETTINGS';
const ADD_CHECKLIST = 'tasklist/ADD_CHECKLIST';

// 업무리스트
export const addTasklist = payload => ({ type: ADD_TASKLIST, payload });
export const delTasklist = payload => ({ type: DEL_TASKLIST, payload });
export const changeTasklistTitle = payload => ({
  type: CHANGE_TASKLIST_TITLE,
  payload,
});
//업무
export const setTask = payload => ({ type: SET_TASK, payload });
export const clearTask = () => ({ type: CLEAR_TASK });
export const addTask = payload => ({ type: ADD_TASK, payload });
export const delTask = payload => ({ type: DEL_TASK, payload });
export const toggleTask = payload => ({ type: TOGGLE_TASK, payload });
export const changeTaskTitle = payload => ({
  type: CHANGE_TASK_TITLE,
  payload,
});
export const changeTaskSettings = payload => ({
  type: CHANGE_TASK_SETTINGS,
  payload,
});
export const addChecklist = payload => ({ type: ADD_CHECKLIST, payload });

const initialState = {
  tasklists: [],
  task: {},
};

export default function tasklists(state = initialState, action) {
  switch (action.type) {
    case ADD_TASKLIST:
      return {
        ...state,
        tasklists: state.tasklists.concat({
          id: tasklistId++,
          title: action.payload,
        }),
      };
    case DEL_TASKLIST:
      return {
        ...state,
        tasklists: state.tasklists.filter(item => item.id !== action.payload),
      };
    case CHANGE_TASKLIST_TITLE:
      return {
        ...state,
        tasklists: state.tasklists.map(item =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item,
        ),
      };
    case SET_TASK:
      const { tasks } = state.tasklists[action.payload.tasklistId];
      return {
        ...state,
        task: tasks.find(item => item.id === action.payload.taskId),
      };
    case CLEAR_TASK:
      return {
        ...state,
        task: {},
      };
    case ADD_TASK:
      let task = action.payload.task;
      task.id = taskId++;
      return {
        ...state,
        tasklists: state.tasklists.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                tasks: item.tasks ? item.tasks.concat(task) : [].concat(task),
              }
            : item,
        ),
      };
    case DEL_TASK:
      return {
        ...state,
        tasklists: state.tasklists.map(item =>
          item.id === action.payload.tasklistId
            ? {
                ...item,
                tasks: item.tasks.filter(t => t.id !== action.payload.taskId),
              }
            : item,
        ),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasklists: state.tasklists.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                tasks: item.tasks.map(t =>
                  t.id === action.payload.task.id
                    ? {
                        ...t,
                        isDone: !t.isDone,
                        finDt: action.payload.task.finDt,
                      }
                    : t,
                ),
              }
            : item,
        ),
      };
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        tasklists: state.tasklists.map(item =>
          item.id === action.payload.tasklistId
            ? {
                ...item,
                tasks: item.tasks.map(t =>
                  t.id === action.payload.taskId
                    ? {
                        ...t,
                        title: action.payload.title,
                      }
                    : t,
                ),
              }
            : item,
        ),
      };
    case CHANGE_TASK_SETTINGS:
      return {
        ...state,
        tasklists: state.tasklists.map(item =>
          item.id === action.payload.tasklistId
            ? {
                ...item,
                tasks: item.tasks.map(t =>
                  t.id === action.payload.task.id ? action.payload.task : t,
                ),
              }
            : item,
        ),
      };
    case ADD_CHECKLIST:
      const beforeChecklist = action.payload.task.checklist;
      let { checklist } = action.payload;
      checklist.id = checklistId++;
      return {
        ...state,
        tasklists: state.tasklists.map(item =>
          item.id === action.payload.tasklistId
            ? {
                ...item,
                tasks: item.tasks.map(t =>
                  t.id === action.payload.task.id
                    ? {
                        ...t,
                        checklist: t.checklist.concat(checklist),
                      }
                    : t,
                ),
              }
            : item,
        ),
      };
    default:
      return state;
  }
}
