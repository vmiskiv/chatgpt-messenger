"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";

function SideBar() {
  const { data: session } = useSession();

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div></div>
        </div>
      </div>
      {session && (
        <Image
          onClick={() => signOut()}
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2"
          src={session.user?.image!}
          alt="profile"
          width={500}
          height={500}
        />
      )}
    </div>
  );
}

export default SideBar;
