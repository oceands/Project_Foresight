// action - state management
import {
  ACCOUNT_INITIALIZE,
  LOGIN,
  LOGOUT,
  UPDATE_ACCESS_TOKEN,
} from "./actions";

export const initialState = {
  isLoggedIn: false,
  Access_token: "",
  Refresh_token: "",
  isInitialized: false,
  Role: "",
  user: null,
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INITIALIZE: {
      const { isLoggedIn, user, Access_token, Refresh_token, Role } =
        action.payload;
      return {
        ...state,
        isLoggedIn,
        isInitialized: true,
        Access_token,
        Refresh_token,
        Role,
        user,
      };
    }

    case UPDATE_ACCESS_TOKEN: {
      const { Access_token } = action.payload;
      return {
        ...state,
        Access_token,
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
        Refresh_token: "",
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
