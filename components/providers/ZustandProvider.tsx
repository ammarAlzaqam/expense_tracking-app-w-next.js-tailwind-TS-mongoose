"use client";

import { useUserStore } from "@/lib/zustand/userStore";
import { useEffect } from "react";

export default function ZustandProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        console.log("user", data?.user);
        if (data?.user) {
          setUser(data.user);
        } else {
          clearUser();
        }
      } catch (error) {
        clearUser();
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, []);
  return <>{children}</>;
}
