import Link from "next/link";

export default function UserItem({ user }) {
  // Use pathname & if to=== pathname.split['chat/'][1], then active
  return (
    <Link
      href={`/chat/${user?._id}`}
      className={`list-group-item list-group-item-action `}
    >
      {user?.username}
    </Link>
  );
}
