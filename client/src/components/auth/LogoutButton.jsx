"use client";

import { useAuthAPI } from "@/context/Auth/AuthProvider";
import { useLogout } from "@/hooks/rtq/auth.rtq";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../common/Loading/Loading";

export default function LogoutButton() {
  const { mutate: logout, isError, isLoading, isSuccess } = useLogout();
  const { onLogout } = useAuthAPI();

  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      onLogout();
      router.push("/auth/login");
    }
  }, [isError, isSuccess]);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) return <Loading />;
  return (
    <button
      //   disabled={isLoading}
      //   style={{ width: "100%" }}
      onClick={handleLogout}
      className="btn btn-outline-primary"
    >
      Logout
    </button>
  );
}
