"use client";
import { useMessages } from "@/hooks/rtq/message.rtq";
import ChatBody from "./ChatBody";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import { usePathname } from "next/navigation";
import Loading from "@/components/common/Loading/Loading";

import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthUser } from "@/context/Auth/AuthProvider";

export default function Chat() {
  const to = usePathname()?.split("chat/")[1];
  const { isLoading, isError, isSuccess, data } = useMessages(to);
  const me = useAuthUser();

  const [messages, setMessages] = useState([]);

  const socket = useRef();

  useEffect(() => {
    console.log("effect - me");
    if (me) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", me?._id);

      socket.current.on("receive-message", (msg) => {
        console.log({ arrivdedMsg: msg });
        setMessages((prev) => [...prev, msg]);
      });
    }
  }, [me]);

  useEffect(() => {
    if (isSuccess && !!data) {
      setMessages(data?.data);
    }
  }, [isSuccess]);

  if (isLoading) return <Loading />;
  if (isError) return <h3>Error {":)"}</h3>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="h-100 border rounded"
    >
      <ChatHeader />
      <ChatBody socket={socket?.current} messages={messages} />
      <ChatForm socket={socket?.current} setMessages={setMessages} />
    </div>
  );
}
