export const types = {
  SET_USER: 'auth/SET_USER',
  USER_LOGOUT: 'auth/USER_LOGOUT',
};

const initialState = { user: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: action.payload };
    case types.USER_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const logout = () => ({
  type: types.USER_LOGOUT,
});

export default reducer;
