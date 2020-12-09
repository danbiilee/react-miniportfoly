export const stateUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevData = null) => ({
    loading: true,
    data: prevData,
    error: null,
  }),
  success: data => ({
    loading: false,
    data,
    error: null,
  }),
  error: error => ({
    loading: false,
    data: null,
    error,
  }),
};

export const createPromiseThunk = (type, promiseCreator) => {
  console.log('createPromiseThunk', type);
  // const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // return param => async dispatch => {
  //   try {
  //     dispatch({ type, param }); // 요청 시작
  //     const payload = await promiseCreator(param); // 결과의 이름을 payload로 통일
  //     dispatch({ type: SUCCESS, payload, param }); // 성공
  //   } catch (e) {
  //     dispatch({ type: ERROR, error: e }); // 실패
  //   }
  // };
};

export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: stateUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: stateUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: stateUtils.error(action.error),
        };
      default:
        return state;
    }
  };
};

const defaulIdtSelector = param => param;
export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaulIdtSelector,
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => async dispatch => {
    const id = idSelector(param);
    console.log(type, id);
    try {
      dispatch({ type, meta: id });
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      dispatch({ type: ERROR, error: e, meta: id });
    }
  };
};

export const handleAsyncActionsById = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: stateUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null,
            ),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: stateUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: stateUtils.error(action.error),
          },
        };
      default:
        return state;
    }
  };
};
