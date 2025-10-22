"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import EditButton from "./EditButton";
import { useUserStore } from "@/lib/zustand/userStore";

export default function UserInfo({ route }: { route: string }) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return null;
  }

  const { image, username, email } = user;

  return (
    <section className="">
      {/*//! User information */}
      <div className="flex justify-between gap-3">
        {/*//* User (image, username, email) */}
        <div className="flex gap-3 items-center">
          {/*//* Image */}
          <Link href="/profile" className="relative h-15 w-15">
            <Image
              src={image || "/assets/user.svg"}
              alt="user-info"
              fill
              className={`rounded-full object-cover ${
                image === "/assets/user.svg" && "p-2"
              } bg-dark-4 dark:bg-dark-3`}
            />
          </Link>
          {/*//* username, email */}
          <div className="max-w-[150px] sm:max-w-[250px] break-words">
            <h2 className="text-body-bold text-light-1 truncate">
              {username || ""}
            </h2>
            <h3 className="text-subtle text-light-2 truncate">{email || ""}</h3>
          </div>
        </div>

        {route === "/profile" ? (
          <EditButton username={username} email={email} image={image} />
        ) : (
          //* View Link
          <Link href="/profile">
            <Button className="text-white cursor-pointer bg-primary-800 hover:bg-primary-800/80 max-xs:size-8">
              <Eye className="size-4.5" />
              <span className="max-xs:hidden">View</span>
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
