"use client";
import { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  token: null,
  loading: true,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        user: payload.user,
        token: payload.token,
        isAuth: true,
        loading: false,
      };

    case "LOGIN_FAILURE":
      return { ...state, loading: false };
    case "LOGOUT":
      return { ...INITIAL_STATE, loading: false };
    default:
      return state;
  }
};

const AuthAPIContext = createContext();
const AuthUserContext = createContext(INITIAL_STATE.user);
const AuthIsAuthContext = createContext(INITIAL_STATE.isAuth);
const AuthTokenContext = createContext(INITIAL_STATE.token);
const AuthLoadingContext = createContext(INITIAL_STATE.loading);

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const api = useMemo(() => {
    const onLoginStart = () => {
      dispatch({ type: "LOGIN_START" });
    };

    const onLoginSuccess = (payload) => {
      dispatch({ type: "LOGIN_SUCCESS", payload });
    };
    const onLoginFailure = () => {
      dispatch({ type: "LOGIN_FAILURE" });
    };
    const onLogout = () => {
      dispatch({ type: "LOGOUT" });
    };

    return { onLoginStart, onLoginSuccess, onLoginFailure, onLogout };
  }, []);

  //   useEffect(() => {
  //     (async () => {
  //       api.onLoginStart();
  //       const { data, error } = await fetchUserAPI();

  //       if (data) {
  //         api.onLoginSuccess(data?.payload);
  //       } else {
  //         api.onLoginFailure();
  //       }
  //     })();
  //   }, []);

  return (
    <AuthAPIContext.Provider value={api}>
      <AuthUserContext.Provider value={state.user}>
        <AuthIsAuthContext.Provider value={state.isAuth}>
          <AuthTokenContext.Provider value={state.token}>
            <AuthLoadingContext.Provider value={state.loading}>
              {children}
            </AuthLoadingContext.Provider>
          </AuthTokenContext.Provider>
        </AuthIsAuthContext.Provider>
      </AuthUserContext.Provider>
    </AuthAPIContext.Provider>
  );
}

export const useAuthAPI = () => useContext(AuthAPIContext);
export const useAuthUser = () => useContext(AuthUserContext);
export const useAuthIsAuth = () => useContext(AuthIsAuthContext);
export const useAuthToken = () => useContext(AuthTokenContext);
export const useAuthLoading = () => useContext(AuthLoadingContext);
