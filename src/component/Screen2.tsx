export const initialState = {
  loading: true,
  data: [],
  error: null,
};

export const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {...state, loading: action.payload};
    case actionTypes.SET_DATA:
      return {...state, data: action.payload};
    case actionTypes.SET_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};
