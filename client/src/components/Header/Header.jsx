"use client";
import { useAuthIsAuth } from "@/context/Auth/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const isAuth = useAuthIsAuth();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1em 2em",
        borderBottom: "1px solid #444",
        height: "10vh",
      }}
    >
      <Link
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
        }}
        href="/chat"
      >
        <Image src="/icon.png" alt="Logo" width={32} height={32} />
        <h4 style={{ margin: "auto" }}>Converso</h4>
      </Link>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        <Link
          href="/chat"
          style={{ fontWeight: pathname === "/chat" ? "bold" : null }}
        >
          Chat
        </Link>
        {isAuth ? (
          <LogoutButton />
        ) : (
          <>
            <Link
              href="/auth/signup"
              style={{
                fontWeight: pathname === "/auth/signup" ? "bold" : null,
              }}
            >
              Signup
            </Link>
            <Link
              href="/auth/login"
              style={{ fontWeight: pathname === "/auth/login" ? "bold" : null }}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
