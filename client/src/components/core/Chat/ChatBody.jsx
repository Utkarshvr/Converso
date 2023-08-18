import { useAuthUser } from "@/context/Auth/AuthProvider";
import ChatMsg from "./ChatMsg";
import { useEffect, useRef } from "react";

export default function ChatBody({ messages }) {
  const me = useAuthUser();

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="p-2 h-100"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        overflowY: "scroll",
      }}
    >
      {messages.map((message, index) => (
        <ChatMsg key={message._id || index} me={me} message={message} />
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
}
