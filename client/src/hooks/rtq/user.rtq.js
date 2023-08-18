import { fetchUserById, fetchUsers } from "@/api/services/api";
import { useFetchWithReauth } from "./base.rtq";

export function useUsers() {
  return useFetchWithReauth("users", (param_token) => fetchUsers(param_token));
}

export function useUserById(userId) {
  return useFetchWithReauth(["users", userId], (param_token) =>
    fetchUserById(userId, param_token)
  );
}
