import axios from "axios";
import {
  BASE_URL,
  Login_Route,
  Signup_Route,
  USER_Route,
  Refresh_Route,
  NOTE_Route,
  Logout_Route,
  MESSAGE_Route,
} from "../routes/api.routes";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchUserById = (userId, token) =>
  api.get(`${USER_Route}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchUsers = (token) =>
  api.get(`${USER_Route}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchMessages = (to, token) =>
  api.get(`${MESSAGE_Route}/${to}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const sendMessage = ({ to, msg, token }) =>
  api.post(
    `${MESSAGE_Route}/${to}`,
    { message: msg },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const loginUser = (credentials) => api.post(Login_Route, credentials);

export const logoutUser = () => api.post(Logout_Route);

export const SignupUser = (credentials) => api.post(Signup_Route, credentials);

export const RefreshToken = () => api.get(Refresh_Route);

export async function fetchWithReauth(
  originalFetcher,
  orginalToken,
  onLoginSuccess,
  onOpen
) {
  try {
    console.log("FETCHING WITH REAUTH");
    // Try the query with the original token passed
    const original_data = await originalFetcher(orginalToken);

    // if everything is alright that means the token was still valid
    // Hence we returned the original_data
    return original_data;
  } catch (err) {
    // Error Occured: May be the token was invalid or there were any other type of error

    // Get the status code of the response
    const statusCode = err?.response?.status;
    console.log({ err, statusCode });

    if (statusCode === 403) {
      // Means that token is invalid or expired
      try {
        // Try to get a new refresh token
        console.log("GETTING A NEW TOKEN");

        const refreshData = await RefreshToken();
        console.log({ refreshData });

        const newToken = refreshData?.data?.access_token;
        const user = refreshData?.data?.user;

        // Update the user & token with it
        onLoginSuccess({ token: newToken, user });
        toast.info("5s past!\n Token Re-generated");

        try {
          //   Retry the original request with the new token
          console.log("DATA WITH NEW_TOKEN");

          const data = await originalFetcher(newToken);
          return data;
        } catch (error) {
          console.log("Ab kuch nahi ho sakta bhai!");
          throw error;
        }
      } catch (error) {
        const refreshStatusCode = error?.response?.status;
        if (refreshStatusCode === 401) {
          console.log("TOKEN EXPIRED!!! LOGIN AGAIN");
          // navigate("/auth/login");
          // onOpen();
          console.log({ error });
          // toast.error("15s past!\n Login expired! 🙂");

          throw error;
        }
      }
    }
    throw err;
  }
}
