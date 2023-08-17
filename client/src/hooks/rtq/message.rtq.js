import { fetchMessages, sendMessage } from "@/api/services/api";
import { useFetchWithReauth } from "./base.rtq";
import { useMutation } from "react-query";

export function useMessages(to) {
  return useFetchWithReauth(["messages", to], (param_token) =>
    fetchMessages(to, param_token)
  );
}

export function useSendMessage() {
  return useMutation("send-msg", sendMessage);
}
