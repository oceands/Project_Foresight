import configData from "../config";
import axios from "axios";
//import { store } from "../store";
import { store } from "../store/index";
import { LOGOUT, UPDATE_ACCESS_TOKEN } from "../store/actions";

let Access_token = "";
let Refresh_token = "";

store.subscribe(() => {
  // Get the current state after each change
  const currentState = store.getState();

  // Access the specific values you need
  Access_token = currentState.account.Access_token;
  Refresh_token = currentState.account.Refresh_token;

  console.log("Access Token:", Access_token);
  console.log("Refresh Token:", Refresh_token);
});

const axiosInstance = axios.create({
  baseURL: configData.API_SERVER,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add an interceptor to dynamically set the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    if (Access_token) {
      config.headers.Authorization = `Bearer ${Access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error["response"]["data"]["error"] === "token_expired") {
      if (Refresh_token) {
        return axios
          .post(
            configData.API_SERVER + "auth/api/users/refresh",
            {},
            {
              headers: { Authorization: `Bearer ${Refresh_token}` },
            }
          )
          .then((response) => {
            const newAccess_token = response.data.Access_token;

            // Dispatch an action to update the access token in the Redux store

            store.dispatch({
              type: UPDATE_ACCESS_TOKEN,
              payload: {
                Access_token: newAccess_token,
              },
            });

            // Retry the original request with the new access token
            console.log("re-running request after refresh");
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${newAccess_token}`;
            return axios(originalRequest);
          })
          .catch((error) => {
            console.log(error);
            store.dispatch({ type: LOGOUT });
            return Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
