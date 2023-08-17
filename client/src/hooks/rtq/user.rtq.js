import { fetchUsers } from "@/api/services/api";
import { useFetchWithReauth } from "./base.rtq";

export function useUsers() {
  return useFetchWithReauth("users", (param_token) => fetchUsers(param_token));
}
