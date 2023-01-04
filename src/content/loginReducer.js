const INITIAL_STATE = {
    token: null,
    logged: null,
  };

  function loginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        localStorage.setItem('FelixToken', action.token);
        return {
          ...state,
          token: action.token,
          logged: true,
        };
      case 'LOGIN_ERROR':
        return {
          ...state,
          logged: false,
        };
      case 'LOGOUT':
        localStorage.removeItem('FelixToken');
        return {
          ...state,
          logged: null,
        };
      default:
        return state;
    }
  }

  export default loginReducer