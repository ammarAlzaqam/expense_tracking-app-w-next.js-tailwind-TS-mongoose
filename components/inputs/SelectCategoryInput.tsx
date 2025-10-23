"use client";

import { useEffect, useRef, useState } from "react";
import { SelectInput } from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategoriesStore } from "@/lib/zustand/categoriesStore";

export default function SelectCategoryInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categories = useCategoriesStore((state) => state.categories);

  const initialCategory = searchParams.get("category") || "";
  const categoryData = categories?.find((c) => c.slug === initialCategory);
  const [category, setCategory] = useState(categoryData?._id || "");

  useEffect(() => {
    const categoryData = categories?.find((c) => c._id === category);
    const params = new URLSearchParams(searchParams);
    if (categoryData) {
      params.set("category", categoryData.slug);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [category]);

  return (
    <div>
      <SelectInput
        value={category}
        onChange={setCategory}
        label="Categories"
        items={categories || []}
        className={`${category && "border border-primary-500"}`}
      />
    </div>
  );
}
