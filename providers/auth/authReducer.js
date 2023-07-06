export const authReducer = (state, action) => {

  switch (action.type) {

    case '[AUTH] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case '[AUTH] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
};