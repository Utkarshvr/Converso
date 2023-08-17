"use client";

import { useAuthToken } from "@/context/Auth/AuthProvider";
import { useSendMessage } from "@/hooks/rtq/message.rtq";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatForm() {
  const [msg, setMsg] = useState("");

  const to = usePathname().split("chat/")[1];
  const token = useAuthToken();

  const { mutate: sendMsg, isLoading, isSuccess } = useSendMessage();

  useEffect(() => {
    if (isSuccess) setMsg("");
  }, [isSuccess]);

  const onSubmit = () => {
    sendMsg({ to, msg, token });
  };
  return (
    <div className="border-top p-2">
      <div style={{ gap: "1em" }} className="d-flex align-items-center">
        <textarea
          style={{ maxHeight: "140px" }}
          className="form-control"
          placeholder="Your Message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          disabled={isLoading}
        />
        <button
          disabled={isLoading}
          type="button"
          onClick={onSubmit}
          className="btn btn-outline-primary"
        >
          Send
        </button>
      </div>
    </div>
  );
}
