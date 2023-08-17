"use client";
import { useAuthIsAuth, useAuthLoading } from "@/context/Auth/AuthProvider";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading/Loading";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const isAuth = useAuthIsAuth();
  const isLoading = useAuthLoading();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuth) {
      router.push("/auth/login");
    }
  }, [isAuth]);

  if (isLoading) {
    return <Loading />;
  }
  if (isAuth) return <>{children}</>;
}
