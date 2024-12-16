'use client'
import Image from "next/image"
import useCurrentUser from "../hooks/useCurrentUser"

export default function Avatar() {
  const user = useCurrentUser();
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt={"Avatar"}
      src={`${
        user.isUser && user.user?.image
          ? user.user?.image
          : "/images/placeholder.jpg"
      }`}
    />
  );
}
