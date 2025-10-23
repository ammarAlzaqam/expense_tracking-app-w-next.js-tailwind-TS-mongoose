"use client";

import { fetchAllCategories } from "@/lib/actions/category.action";
import { useCategoriesStore } from "@/lib/zustand/categoriesStore";
import { useUserStore } from "@/lib/zustand/userStore";
import { useEffect } from "react";

type Category = {
  _id: string;
  name: string;
  slug: string;
};
export default function ZustandProvider({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: Category[];
}) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const clearCategories = useCategoriesStore((state) => state.clearCategories);
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

    if (categories) {
      setCategories(categories);
    } else {
      clearCategories();
    }

    getUser();
  }, []);
  return <>{children}</>;
}
