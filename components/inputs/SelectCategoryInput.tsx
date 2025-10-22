"use client";

import { useEffect, useRef, useState } from "react";
import { SelectInput } from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

type Category = {
  _id: string;
  slug: string;
  name: string;
};
interface SelectCategoryInputProps {
  categories: Category[];
}
export default function SelectCategoryInput({
  categories,
}: SelectCategoryInputProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "";
  const categoryData = categories.find((c) => c.slug === initialCategory);
  const [category, setCategory] = useState(categoryData?._id || "");

  useEffect(() => {
    const categoryData = categories.find((c) => c._id === category);
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
        items={categories}
      />
    </div>
  );
}
