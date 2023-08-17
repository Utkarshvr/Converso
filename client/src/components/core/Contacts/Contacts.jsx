"use client";

import Container from "@/components/Container/Container";
import Spinner from "@/components/common/Spinner/Spinner";
import UserItem from "@/components/common/User/UserItem";
import { useUsers } from "@/hooks/rtq/user.rtq";

export default function Contacts() {
  const { data, error, isLoading } = useUsers();

  console.log({ data, error });
  if (isLoading)
    return (
      <Container centered>
        <Spinner />
      </Container>
    );
  return (
    <div>
      <h6>Chat with:</h6>

      <div className="list-group">
        {data?.data?.map((user) => (
          <UserItem key={user?._id} user={user} />
        ))}
      </div>
    </div>
  );
}
