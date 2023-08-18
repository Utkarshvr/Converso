"use client";
import { useUserById } from "@/hooks/rtq/user.rtq";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChatHeader() {
  const to = usePathname()?.split("chat/")[1];

  const { data } = useUserById(to);
  return (
    <div className="border-bottom p-2 d-flex align-items-center">
      <Link href="/chat">
        <button type="button" className="btn-close mx-2" aria-label="Close" />
      </Link>
      <p className="m-0">{data?.data?.username}</p>
    </div>
  );
}
