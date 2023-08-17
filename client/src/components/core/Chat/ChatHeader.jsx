import Link from "next/link";

export default function ChatHeader() {
  return (
    <div className="border-bottom p-2 d-flex align-items-center">
      <Link href="/chat">
        <button type="button" className="btn-close mx-2" aria-label="Close" />
      </Link>
      <p className="m-0">Header</p>
    </div>
  );
}
