"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`);

  }, [searchValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchValue}
        onChange={handleChange}
        className="form-input pl-10 pr-4 py-2 rounded-md focus:outline-1 focus:outline-primary-500"
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-1" />
    </div>
  );
}
