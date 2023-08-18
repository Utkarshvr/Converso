import {
  fetchUserById,
  logoutUser,
  loginUser,
  RefreshToken,
  SignupUser,
} from "@/api/services/api";
import { useMutation, useQuery } from "react-query";

import { toast } from "react-toastify";

export function useLogin() {
  return useMutation("login-user", loginUser, {
    onSuccess: () => {
      // toast.success("Login successfull");
    },
  });
}

export function useLogout() {
  return useMutation("logout-user", logoutUser, {
    onSuccess: () => {
      // toast.success("Logged out successfully");
    },
  });
}

export function useRefresh() {
  return useMutation("refresh-token", RefreshToken, {
    onSuccess: () => {
      // toast.info("Access Token is renewed");
    },
    onError: () => {
      // toast.error("Login Expired! ⚡️");
    },
  });
}

export function useSignup() {
  return useMutation("signup-user", SignupUser, {
    onSuccess: () => {
      // toast.success("Signup successfull");
    },
  });
}
