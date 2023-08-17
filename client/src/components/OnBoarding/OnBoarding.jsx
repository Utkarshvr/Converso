"use client";
import { useAuthAPI, useAuthToken } from "@/context/Auth/AuthProvider";
import { useRefresh } from "@/hooks/rtq/auth.rtq";
import { useEffect } from "react";

export default function OnBoarding({ children }) {
  const { onLoginSuccess, onLoginFailure } = useAuthAPI();
  const token = useAuthToken();

  const { mutate: refreshToken, data, isError, isSuccess } = useRefresh();

  // console.log({ token, data, error, isLoading, isError, isSuccess });

  useEffect(() => {
    if (isSuccess)
      onLoginSuccess({
        token: data?.data?.access_token,
        user: data?.data?.user,
      });
    if (isError) onLoginFailure();
  }, [isError, isSuccess]);

  useEffect(() => {
    if (!!!token) {
      console.log("Trying to refresh token");
      // toast.info("Refreshing Access Token");
      refreshToken();
    } else {
      console.log("No need to refresh");
    }
  }, []);
  return <>{children}</>;
}
