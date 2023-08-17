import { fetchWithReauth } from "@/api/services/api";
import { useAuthAPI, useAuthToken } from "@/context/Auth/AuthProvider";
import { useQuery, useMutation } from "react-query";

/* Custom hook for fetching data with reauthentication logic */
export function useFetchWithReauth(queryKey, fetcher) {
  const { onLoginSuccess } = useAuthAPI();
  //   const { onOpen } = useModalAPI();
  const originalToken = useAuthToken();

  return useQuery(
    queryKey,
    () => fetchWithReauth(fetcher, originalToken, onLoginSuccess),
    {
      retry: 0,
      enabled: !!originalToken,
    }
  );
}
export function useMutateWithReauth(queryKey, fetcher) {
  const { onLoginSuccess } = useAuthAPI();
  //   const { onOpen } = useModalAPI();
  const originalToken = useAuthToken();

  return useMutation(
    queryKey,
    () => fetchWithReauth(fetcher, originalToken, onLoginSuccess),
    {
      retry: 0,
      enabled: !!originalToken,
    }
  );
}
