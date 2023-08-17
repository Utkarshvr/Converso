"use client";
import { useMessages } from "@/hooks/rtq/message.rtq";
import ChatBody from "./ChatBody";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import { usePathname } from "next/navigation";
import Loading from "@/components/common/Loading/Loading";

export default function Chat() {
  const to = usePathname()?.split("chat/")[1];
  const { isLoading, isError, data } = useMessages(to);
  console.log({ data });
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
      <ChatBody messages={data?.data} />
      <ChatForm />
    </div>
  );
}
