// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from "./actions";

export const initialState = {
  isLoggedIn: false,
  Access_token: "",
  Refresh_token: "",
  isInitialized: false,
  user: null,
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INITIALIZE: {
      const { isLoggedIn, user, Access_token, Refresh_token } = action.payload;
      return {
        ...state,
        isLoggedIn,
        isInitialized: true,
        Access_token,
        Refresh_token,
        user,
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        Access_token: "",
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
