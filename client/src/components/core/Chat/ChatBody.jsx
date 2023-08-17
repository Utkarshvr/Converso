import { useAuthUser } from "@/context/Auth/AuthProvider";
import ChatMsg from "./ChatMsg";

export default function ChatBody({ messages }) {
  const me = useAuthUser();
  return (
    <div
      className="p-2 h-100"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        overflowY: "scroll",
      }}
    >
      {messages.map((message) => (
        <ChatMsg key={message._id} me={me} message={message} />
      ))}
    </div>
  );
}
